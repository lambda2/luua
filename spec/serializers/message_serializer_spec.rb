# == Schema Information
#
# Table name: messages
#
#  id                  :bigint           not null, primary key
#  content             :text
#  message_type        :integer          default("user"), not null
#  negative_vote_count :integer          default(0), not null
#  positive_vote_count :integer          default(0), not null
#  root                :boolean          default(FALSE), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  discussion_id       :bigint           not null
#  parent_id           :integer
#  user_id             :bigint           not null
#
# Indexes
#
#  index_messages_on_discussion_id  (discussion_id)
#  index_messages_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

describe MessageSerializer do

  before :each do
    expect(Message.count).to eq(0)
    FactoryBot.create_list(:message, 3)
  end

  let(:message) { create(:message) }
  let(:messages) { Message.all }

  it '#serialize' do
    serialized = JSON.parse(MessageSerializer.new.serialize(message).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(message.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(messages, each_serializer: MessageSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(messages.count)
  end
end
