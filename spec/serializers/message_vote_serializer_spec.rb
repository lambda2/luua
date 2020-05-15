require 'rails_helper'

describe MessageVoteSerializer do

  before :each do
    expect(MessageVote.count).to eq(0)
    FactoryBot.create_list(:message_vote, 3)
  end

  let(:message_vote) { create(:message_vote) }
  let(:message_votes) { MessageVote.all }

  it '#serialize' do
    serialized = JSON.parse(MessageVoteSerializer.new.serialize(message_vote).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(message_vote.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(message_votes, each_serializer: MessageVoteSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(message_votes.count)
  end
end
