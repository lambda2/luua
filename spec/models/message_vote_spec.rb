# == Schema Information
#
# Table name: message_votes
#
#  id         :bigint           not null, primary key
#  vote       :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  message_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_message_votes_on_message_id              (message_id)
#  index_message_votes_on_user_id                 (user_id)
#  index_message_votes_on_user_id_and_message_id  (user_id,message_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (message_id => messages.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe MessageVote, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end