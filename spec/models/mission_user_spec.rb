# == Schema Information
#
# Table name: mission_users
#
#  id           :bigint           not null, primary key
#  accepted_at  :datetime
#  applied_at   :datetime         not null
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

require 'rails_helper'

RSpec.describe MissionUser, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
