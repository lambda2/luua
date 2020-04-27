# == Schema Information
#
# Table name: mission_users
#
#  id           :bigint           not null, primary key
#  accepted_at  :datetime
#  applied_at   :datetime         not null
#  completed_at :datetime
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

class MissionUserLightSerializer < Panko::Serializer
  attributes :id, :mission_id, :user_id, :status, :applied_at,
             :accepted_at, :rejected_at, :completed_at, :reviewed_at,
             :created_at, :updated_at, :match_score, :workspace_id,
             :user_name, :mission_name
  
  def workspace_id
    object.mission&.workspace_id
  end

  def user_name
    object&.user&.username
  end

  def mission_name
    object&.mission&.name
  end

end
