# == Schema Information
#
# Table name: mission_users
#
#  id           :bigint           not null, primary key
#  accepted_at  :datetime
#  applied_at   :datetime         not null
#  canceled_at  :datetime
#  completed_at :datetime
#  match_score  :integer
#  rejected_at  :datetime
#  reviewed_at  :datetime
#  status       :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  mission_id   :bigint           not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_mission_users_on_mission_id  (mission_id)
#  index_mission_users_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (mission_id => missions.id)
#  fk_rails_...  (user_id => users.id)
#

class MissionUser < ApplicationRecord
  include AASM

  belongs_to :mission, touch: true
  belongs_to :user

  has_many :workspace_histories, as: :resource

  validates_uniqueness_of :user_id, scope: [:mission_id]

  has_many :notifications, as: :resource, dependent: :destroy

  # - applied: The candidate applied for a mission
  # - rejected: The candidate has been rejected to do this mission
  # - accepted: The candidate has been accepted, he can start
  # - completed: The candidate mission is done
  # - reviewed: The candidate mission has been reviewed and is complete
  # - canceled: The candidate canceled the mission
  enum status: {
    applied: 0,
    rejected: 1,
    accepted: 2,
    completed: 3,
    reviewed: 4,
    canceled: 5
  }, _suffix: true

  scope :contributors, -> { where.not(status: %i[applied rejected canceled]) }

  before_create do
    self.applied_at = Time.zone.now
    self.match_score = compute_match_score
  end

  after_save :recompute_status_from_changes!

  aasm column: :status, enum: true, logger: Rails.logger do # rubocop:todo Metrics/BlockLength
    state :applied, initial: true
    state :rejected, :canceled, :accepted, :completed, :reviewed

    event :accept do
      before { self.accepted_at = Time.zone.now }
      transitions from: :applied, to: :accepted
    end

    event :reject do
      before { self.rejected_at = Time.zone.now }
      transitions from: %i[applied accepted completed], to: :rejected
    end

    event :cancel do
      before { self.canceled_at = Time.zone.now }
      transitions from: %i[applied accepted completed], to: :canceled
    end

    event :complete do
      before { self.completed_at = Time.zone.now }
      transitions from: %i[accepted], to: :completed
    end

    event :review do
      before { self.reviewed_at = Time.zone.now }
      transitions from: %i[completed], to: :reviewed
    end

    after_all_transitions :log_status_change
  end

  def log_status_change
    puts "changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  # when something changes (ex: an user applied to the mission)
  # check if we have something to do on the mission
  def recompute_status_from_changes!
    mission.recompute_status_from_changes!
  end

  def compute_match_score
    # If no skills are defined, all candidates have the best score
    return 100 if mission.mission_skills.empty?

    mission_total = mission.mission_skills.count * 4
    user_total = mission.mission_skills.where(skill_id: user.skill_ids).map do |ms|
      us = user.user_skills.where(skill_id: ms.skill_id).first
      score_for_skill(ms, us)
    end
    (user_total.sum * 100) / mission_total
  end

  def score_for_skill(ms, us) # rubocop:todo Naming/MethodParameterName
    return 0.1 unless us
    return 1 if ms.mandatory && us.level < ms.level
    return 2 if us.level < ms.level
    return 4 if ms.mandatory && us.level >= ms.level

    3
  end

  def mission_owner_ids
    (mission.created_by && [mission.created_by] || mission.workspace.admin_ids).compact
  end
end
