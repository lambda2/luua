# == Schema Information
#
# Table name: missions
#
#  id                  :bigint           not null, primary key
#  banner_image        :string
#  begin_at            :datetime
#  canceled_at         :datetime
#  completed_at        :datetime
#  created_by          :integer
#  description         :text
#  due_at              :datetime
#  end_at              :datetime
#  hiring_validation   :integer          default("review"), not null
#  image               :string
#  modified_at         :datetime         not null
#  modified_by         :integer
#  name                :string           not null
#  participant_count   :integer
#  physical            :boolean          default(FALSE), not null
#  slug                :string           not null
#  started_at          :datetime
#  status              :integer          default("pending"), not null
#  visibility          :integer          default("draft"), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  discussion_id       :bigint
#  mission_category_id :bigint
#  organization_id     :bigint
#  workspace_id        :bigint
#
# Indexes
#
#  index_missions_on_discussion_id        (discussion_id)
#  index_missions_on_mission_category_id  (mission_category_id)
#  index_missions_on_organization_id      (organization_id)
#  index_missions_on_workspace_id         (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (mission_category_id => mission_categories.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

class Mission < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  include Trackable
  track!

  include AASM

  belongs_to :mission_category, optional: true

  # Skills required/optional for the mission
  has_many :mission_skills, dependent: :destroy
  has_many :skills, through: :mission_skills

  # USers applying for this mission
  has_many :mission_users, dependent: :destroy
  has_many :users, through: :mission_users

  belongs_to :discussion, optional: true
  belongs_to :organization, optional: true
  belongs_to :workspace, counter_cache: true, touch: true

  has_many :workspace_histories, as: :resource, dependent: :destroy
  has_many :notifications, as: :resource, dependent: :destroy

  # discussion in the mission
  has_many :discussions, as: :resource, dependent: :destroy

  validates :name, uniqueness: { scope: %i[workspace_id organization_id] }

  # - draft: Mission is not published yet, and only visible for the editor
  # - hidden: Mission is only visible for editor and workspace admin
  # - protected: Mission is only visible for workspace members
  # - public: Mission is visible to everyone
  enum visibility: %i[draft hidden protected public], _suffix: true

  # Candidates can apply for a mission. Then, depending on the `hiring_validation`:
  # - review: All candidates must be manually approved
  # - trusted: Previously accepted candidates are automatically approved, other must be validated
  # - requirements: candidates that matches the required skills are automatically approved, other must be validated
  # - accept_all: All candidates are automatically approved
  enum hiring_validation: %i[review trusted requirements accept_all], _suffix: true

  # - open: The mission is open to participants
  # - pending: The mission is pending, and is not ready to have any participants yet
  # - canceled: The mission has been canceled
  # - started: The mission has all the required participants, and is started
  # - completed: The mission has been completed, and is done
  enum status: {
    open: 0,
    pending: 1,
    canceled: 2,
    started: 3,
    completed: 4
  }, _suffix: true

  accepts_nested_attributes_for :mission_skills,
                                allow_destroy: true,
                                reject_if: :all_blank

  scope :available_for, ->(user_id) { visible_for(user_id).distinct }
  scope :search, ->(q) { joins(:workspace).where('LOWER(unaccent(missions.name)) ILIKE LOWER(unaccent(?)) OR LOWER(unaccent(workspaces.name)) ILIKE LOWER(unaccent(?))', "%#{q}%", "%#{q}%") }

  aasm column: :status, enum: true, logger: Rails.logger do # rubocop:todo Metrics/BlockLength
    state :open, initial: true
    state :pending, :canceled, :started, :completed

    event :pause do
      transitions from: %i[open started canceled], to: :pending
    end

    event :open do
      transitions from: %i[pending canceled], to: :open
    end

    event :start do
      before { self.started_at = Time.zone.now }
      transitions from: %i[pending open], to: :started
    end

    event :cancel do
      before { self.canceled_at = Time.zone.now }
      transitions from: %i[pending open started], to: :canceled
    end

    event :complete do
      before { self.completed_at = Time.zone.now }
      transitions from: %i[pending open started], to: :completed
    end

    after_all_transitions :log_status_change
  end


  before_create :set_proper_status
  after_save :schedule_events

  def set_proper_status
    self.status = :started unless begin_at&.future?
  end

  # Schedule async events for the mission
  def schedule_events
    return unless end_at_previously_changed? || begin_at_previously_changed?

    EndMissionWorker.delete_all(id)
    StartMissionWorker.delete_all(id)

    # We shedule the start and the end of the mission
    EndMissionWorker.perform_at(end_at, id) if end_at
    StartMissionWorker.perform_at(begin_at, id) if begin_at
  end

  def self.visible_for(user_id)
    return where(visibility: :public) unless user_id

    miss = <<-SQL
        missions.visibility = #{Mission.visibilities[:public]} OR
        (
          missions.visibility IN (#{Mission.visibilities[:draft]}, #{Mission.visibilities[:hidden]}, #{Mission.visibilities[:protected]}) AND
          created_by = #{user_id}
        ) OR
        ("workspace_users"."user_id" = #{user_id} AND visibility = #{Mission.visibilities[:protected]}) OR
        ("workspace_users"."user_id" = #{user_id} AND "workspace_users"."admin" = true AND visibility = #{Mission.visibilities[:hidden]})
    SQL

    joins(workspace: :workspace_users).where(miss)
  end

  # when something changes (ex: an user applied to the mission)
  # check if we have something to do
  def recompute_status_from_changes!
    recompute_status_changes_for_open!
    recompute_status_changes_for_started!
  end
  
  # Start the mission if it's open,
  # and the minimum amount of participants have been accepted the mission
  def recompute_status_changes_for_open!
    return unless open?

    accepted = mission_users.accepted
    start! if !begin_at && participant_count && accepted.count >= participant_count
  end

  # Complete the mission if it's started,
  # and the minimum amount of participants completed the mission
  def recompute_status_changes_for_started!
    return unless started?

    completed = mission_users.completed
    complete! if participant_count && completed.count >= participant_count
  end

  def log_status_change
    puts "changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end
end
