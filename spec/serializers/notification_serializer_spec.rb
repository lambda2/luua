# == Schema Information
#
# Table name: notifications
#
#  id            :bigint           not null, primary key
#  code          :integer
#  content       :string
#  link          :string
#  resource_type :string
#  title         :string
#  viewed_at     :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint
#  user_id       :bigint           not null
#
# Indexes
#
#  index_notifications_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_notifications_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
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
