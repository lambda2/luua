# == Schema Information
#
# Table name: messages
#
#  id                  :bigint           not null, primary key
#  content             :text
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
class MessageSerializer < Panko::Serializer
  attributes :id, :content, :parent_id, :user_id, :discussion_id,
             :created_at, :updated_at,
             :positive_vote_count, :negative_vote_count

  has_one :user, serializer: UserLightSerializer
  has_one :parent, serializer: MessageSerializer
end
