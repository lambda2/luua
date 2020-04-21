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

describe MissionSkillSerializer do

  before :each do
    expect(MissionSkill.count).to eq(0)
    FactoryBot.create_list(:mission_skill, 3)
  end

  let(:mission_skill) { create(:mission_skill) }
  let(:mission_skills) { MissionSkill.all }

  it '#serialize' do
    serialized = JSON.parse(MissionSkillSerializer.new.serialize(mission_skill).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(mission_skill.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(mission_skills, each_serializer: MissionSkillSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(mission_skills.count)
  end
end
