require 'rails_helper'

describe MissionLightSerializer do

  before :each do
    expect(Mission.count).to eq(0)
    FactoryBot.create_list(:mission, 3)
  end

  let(:mission) { create(:mission) }
  let(:missions) { Mission.all }

  it '#serialize' do
    serialized = JSON.parse(MissionLightSerializer.new.serialize(mission).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(mission.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(missions, each_serializer: MissionLightSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(missions.count)
  end
end
