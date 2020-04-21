# == Schema Information
#
# Table name: user_skills
#
#  id         :bigint           not null, primary key
#  level      :integer          default(1), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  skill_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_skills_on_skill_id  (skill_id)
#  index_user_skills_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill_id => skills.id)
#  fk_rails_...  (user_id => users.id)
#

class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill

  validates :level, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5
  }

  validates_uniqueness_of :skill_id, scope: [:user_id]

  after_commit :refresh_mission_users_score

  def refresh_mission_users_score
    user.mission_users.map do |mu|
      mu.update(match_score: mu.compute_match_score)
    end
  end

end