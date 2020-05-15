require 'rails_helper'

describe NotificationSerializer do

  before :each do
    expect(Notification.count).to eq(0)
    FactoryBot.create_list(:notification, 3)
  end

  let(:notification) { create(:notification) }
  let(:notifications) { Notification.all }

  it '#serialize' do
    serialized = JSON.parse(NotificationSerializer.new.serialize(notification).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(notification.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(notifications, each_serializer: NotificationSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(notifications.count)
  end
end
