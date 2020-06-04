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
#  serialized_content  :text
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
class MessageSerializer < Panko::Serializer
  attributes :id, :content, :parent_id, :user_id, :discussion_id,
             :created_at, :updated_at, :workspace_id,
             :positive_vote_count, :negative_vote_count,
             :serialized_content, :message_type

  has_one :user, serializer: UserLightSerializer
  has_one :parent, serializer: MessageSerializer

  def workspace_id
    object&.discussion&.workspace&.id
  end
end
