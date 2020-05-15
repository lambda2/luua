
require 'rails_helper'

describe DiscussionSerializer do

  before :each do
    expect(Discussion.count).to eq(0)
    FactoryBot.create_list(:discussion, 3)
  end

  let(:discussion) { create(:discussion) }
  let(:discussions) { Discussion.all }

  it '#serialize' do
    serialized = JSON.parse(DiscussionSerializer.new.serialize(discussion).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(discussion.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(discussions, each_serializer: DiscussionSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(discussions.count)
  end
end

