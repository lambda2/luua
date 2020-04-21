require 'rails_helper'

describe SkillLightSerializer do

  before :each do
    FactoryBot.create_list(:skill, 3)
  end

  let(:skill) { create(:skill) }
  let(:skills) { Skill.all }

  it '#serialize' do
    serialized = JSON.parse(SkillLightSerializer.new.serialize(skill).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(skill.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(skills, each_serializer: SkillLightSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(skills.count)
  end
end
