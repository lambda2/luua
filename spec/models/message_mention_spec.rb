# == Schema Information
#
# Table name: message_mentions
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  discussion_id :bigint           not null
#  message_id    :bigint           not null
#  user_id       :bigint
#
# Indexes
#
#  index_message_mentions_on_discussion_id  (discussion_id)
#  index_message_mentions_on_message_id     (message_id)
#  index_message_mentions_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (message_id => messages.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe MessageMention, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
