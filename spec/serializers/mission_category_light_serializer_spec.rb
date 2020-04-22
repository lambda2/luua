require 'rails_helper'

describe MissionCategoryLightSerializer do

  # before :each do
  #   expect(MissionCategory.count).to eq(0)
  #   FactoryBot.create_list(:mission_category, 3)
  # end

  # let(:mission_category) { create(:mission_category) }
  # let(:mission_categories) { MissionCategory.all }

  # it '#serialize' do
  #   serialized = JSON.parse(MissionCategoryLightSerializer.new.serialize(mission_category).to_json)
  #   expect(serialized).not_to be(nil)
  #   expect(serialized['id']).to eq(mission_category.id)
  # end

  # it '#serialize_collection' do
  #   serialized = JSON.parse(Panko::ArraySerializer.new(mission_categories, each_serializer: MissionCategoryLightSerializer).to_json)
  #   expect(serialized).not_to be(nil)
  #   expect(serialized.count).to eq(mission_categories.count)
  # end
end
