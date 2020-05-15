# == Schema Information
#
# Table name: discussions
#
#  id                     :bigint           not null, primary key
#  messages_count         :integer          default(0), not null
#  name                   :string           not null
#  resource_type          :string           not null
#  slug                   :string           not null
#  visibility             :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  discussion_category_id :bigint
#  resource_id            :bigint           not null
#  user_id                :bigint           not null
#
# Indexes
#
#  index_discussions_on_discussion_category_id         (discussion_category_id)
#  index_discussions_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_discussions_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_category_id => discussion_categories.id)
#  fk_rails_...  (user_id => users.id)
#
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
