# == Schema Information
#
# Table name: missions
#
#  id                  :bigint           not null, primary key
#  banner_image        :string
#  created_by          :integer
#  description         :text
#  hiring_validation   :integer          default("review"), not null
#  image               :string
#  modified_by         :integer
#  name                :string           not null
#  participant_count   :integer
#  physical            :boolean          default(FALSE), not null
#  slug                :string           not null
#  visibility          :integer          default("draft"), not null
#  begin_at            :datetime
#  due_at              :datetime
#  end_at              :datetime
#  modified_at         :datetime         not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  mission_category_id :bigint
#  organization_id     :bigint
#  workspace_id        :bigint
#
# Indexes
#
#  index_missions_on_mission_category_id  (mission_category_id)
#  index_missions_on_organization_id      (organization_id)
#  index_missions_on_workspace_id         (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (mission_category_id => mission_categories.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

class Mission < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  include Trackable
  track!

  belongs_to :mission_category, optional: true

  # Skills required/optional for the mission
  has_many :mission_skills, dependent: :destroy
  has_many :skills, through: :mission_skills

  # USers applying for this mission
  has_many :mission_users, dependent: :destroy
  has_many :users, through: :mission_users

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

  accepts_nested_attributes_for :mission_skills,
                                allow_destroy: true,
                                reject_if: :all_blank

  scope :available_for, ->(user_id) { visible_for(user_id).distinct }
  scope :search, ->(q) { joins(:workspace).where('LOWER(unaccent(missions.name)) ILIKE LOWER(unaccent(?)) OR LOWER(unaccent(workspaces.name)) ILIKE LOWER(unaccent(?))', "%#{q}%", "%#{q}%") }

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
end
