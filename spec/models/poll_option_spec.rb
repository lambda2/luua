# == Schema Information
#
# Table name: poll_options
#
#  id          :bigint           not null, primary key
#  description :text
#  icon        :string
#  name        :string           not null
#  slug        :string           not null
#  vote_count  :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  poll_id     :bigint           not null
#
# Indexes
#
#  index_poll_options_on_poll_id           (poll_id)
#  index_poll_options_on_slug_and_poll_id  (slug,poll_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (poll_id => polls.id)
#
require 'rails_helper'

RSpec.describe PollOption, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
