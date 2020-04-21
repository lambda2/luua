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

require 'rails_helper'

RSpec.describe MissionSkill, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
