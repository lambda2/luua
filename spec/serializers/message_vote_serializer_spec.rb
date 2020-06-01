# == Schema Information
#
# Table name: message_votes
#
#  id           :bigint           not null, primary key
#  vote         :integer          default("positive"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  message_id   :bigint           not null
#  user_id      :bigint           not null
#  workspace_id :bigint
#
# Indexes
#
#  index_message_votes_on_message_id              (message_id)
#  index_message_votes_on_user_id                 (user_id)
#  index_message_votes_on_user_id_and_message_id  (user_id,message_id) UNIQUE
#  index_message_votes_on_workspace_id            (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (message_id => messages.id)
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
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
