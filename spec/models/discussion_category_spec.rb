# == Schema Information
#
# Table name: discussion_categories
#
#  id                :bigint           not null, primary key
#  category          :integer          default("other"), not null
#  color             :string
#  discussions_count :integer          default(0), not null
#  icon              :string
#  name              :string           not null
#  slug              :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  workspace_id      :bigint           not null
#
# Indexes
#
#  index_discussion_categories_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#
require 'rails_helper'

RSpec.describe DiscussionCategory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
