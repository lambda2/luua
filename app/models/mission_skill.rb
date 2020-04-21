# == Schema Information
#
# Table name: mission_skills
#
#  id         :bigint           not null, primary key
#  level      :integer          default(1), not null
#  mandatory  :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  mission_id :bigint           not null
#  skill_id   :bigint           not null
#
# Indexes
#
#  index_mission_skills_on_mission_id  (mission_id)
#  index_mission_skills_on_skill_id    (skill_id)
#
# Foreign Keys
#
#  fk_rails_...  (mission_id => missions.id)
#  fk_rails_...  (skill_id => skills.id)
#

class MissionSkill < ApplicationRecord
  belongs_to :mission
  belongs_to :skill

  validates :level, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5
  }

  validates_uniqueness_of :skill_id, scope: [:mission_id]

  after_commit :refresh_mission_users_score

  def refresh_mission_users_score
    mission.mission_users.map do |mu|
      mu.update(match_score: mu.compute_match_score)
    end
  end
end
