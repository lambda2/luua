# == Schema Information
#
# Table name: messages
#
#  id            :bigint           not null, primary key
#  content       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  discussion_id :bigint           not null
#  parent_id     :integer
#  user_id       :bigint           not null
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
class Message < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :parent, optional: true, class_name: 'Message'
  belongs_to :discussion # , counter_cache: :messages_count
end
