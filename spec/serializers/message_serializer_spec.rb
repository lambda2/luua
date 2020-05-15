
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

