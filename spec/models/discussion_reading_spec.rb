# == Schema Information
#
# Table name: discussion_readings
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  discussion_id :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_discussion_readings_on_discussion_id  (discussion_id)
#  index_discussion_readings_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe DiscussionReading, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
