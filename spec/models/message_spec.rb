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
require 'rails_helper'

RSpec.describe Message, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
