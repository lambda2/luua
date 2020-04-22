require 'rails_helper'

describe UserSkillLightSerializer do

  before :each do
    expect(UserSkill.count).to eq(0)
    FactoryBot.create_list(:user_skill, 3)
  end

  let(:user_skill) { create(:user_skill) }
  let(:user_skills) { UserSkill.all }

  it '#serialize' do
    serialized = JSON.parse(UserSkillLightSerializer.new.serialize(user_skill).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(user_skill.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(user_skills, each_serializer: UserSkillLightSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(user_skills.count)
  end
end
