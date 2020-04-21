require 'rails_helper'

describe UserInfoSerializer do

  before :each do
    expect(User.count).to eq(0)
    FactoryBot.create_list(:user, 3)
  end

  let(:user_info) { create(:user) }
  let(:user_infos) { User.all }

  it '#serialize' do
    serialized = JSON.parse(UserInfoSerializer.new.serialize(user_info).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(user_info.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(user_infos, each_serializer: UserInfoSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(user_infos.count)
  end
end
