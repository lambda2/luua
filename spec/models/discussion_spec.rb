# == Schema Information
#
# Table name: discussions
#
#  id                     :bigint           not null, primary key
#  locked_at              :datetime
#  locked_by              :integer
#  messages_count         :integer          default(0), not null
#  modified_at            :datetime
#  name                   :string           not null
#  resource_type          :string           not null
#  slug                   :string           not null
#  visibility             :integer          default("public"), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  discussion_category_id :bigint
#  resource_id            :bigint           not null
#  root_message_id        :bigint
#  user_id                :bigint           not null
#
# Indexes
#
#  index_discussions_on_discussion_category_id         (discussion_category_id)
#  index_discussions_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_discussions_on_root_message_id                (root_message_id)
#  index_discussions_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_category_id => discussion_categories.id)
#  fk_rails_...  (root_message_id => messages.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Discussion, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
