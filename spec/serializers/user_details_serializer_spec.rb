require 'rails_helper'

describe UserDetailsSerializer do

  before :each do
    expect(User.count).to eq(0)
    FactoryBot.create_list(:user, 3)
  end

  let(:user) { create(:user) }
  let(:users) { User.all }

  it '#serialize' do
    serialized = JSON.parse(UserDetailsSerializer.new.serialize(user).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(user.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(users, each_serializer: UserDetailsSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(users.count)
  end
end
