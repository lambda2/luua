# == Schema Information
#
# Table name: priorities
#
#  id           :bigint           not null, primary key
#  color        :string
#  name         :string
#  position     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_priorities_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#

require 'rails_helper'

RSpec.describe Priority, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
