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

class MissionUserSerializer < Panko::Serializer
  attributes :id, :mission_id, :user_id, :status, :applied_at,
             :accepted_at, :rejected_at, :completed_at, :reviewed_at,
             :created_at, :updated_at, :match_score

  has_one :user, serializer: UserLightSerializer
  has_one :mission, serializer: MissionLightSerializer

end
