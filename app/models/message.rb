# == Schema Information
#
# Table name: messages
#
#  id                  :bigint           not null, primary key
#  content             :text
#  event_type          :integer
#  message_type        :integer          default("user"), not null
#  negative_vote_count :integer          default(0), not null
#  positive_vote_count :integer          default(0), not null
#  resource_type       :string
#  root                :boolean          default(FALSE), not null
#  serialized_content  :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  discussion_id       :bigint           not null
#  parent_id           :integer
#  resource_id         :bigint
#  user_id             :bigint
#
# Indexes
#
#  index_messages_on_discussion_id                  (discussion_id)
#  index_messages_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_messages_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (user_id => users.id)
#
class Message < ApplicationRecord

  MENTION_TYPE = 'mention'.freeze
  LINK_TYPE = 'LINK'.freeze

  belongs_to :user, optional: true
  belongs_to :parent, optional: true, class_name: 'Message'
  belongs_to :discussion, touch: true
  has_many :message_votes, dependent: :destroy
  has_many :message_mentions, dependent: :destroy
  validates :content, presence: true
  has_many :notifications, as: :resource, dependent: :destroy

  belongs_to :resource, polymorphic: true, optional: true

  after_create :update_discussion_timestamps

  # - user: Message is posted by user
  # - system: Message is a contextual information
  enum message_type: %i[user system root], _suffix: true
  
  enum event_type: %i[
    poll_created
    poll_closed
  ], _suffix: true

  counter_culture :discussion, column_name: proc {|model| model.user_message_type? ? 'messages_count' : nil }

  def update_discussion_timestamps
    discussion.update_columns(updated_at: Time.zone.now, modified_at: Time.zone.now)
  end

  def self.create_bot_message params
    create(params.merge(
      message_type: :system
    ))
  end
end
