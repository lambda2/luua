# == Schema Information
#
# Table name: workspace_histories
#
#  id            :bigint           not null, primary key
#  change_type   :integer          not null
#  payload       :text
#  resource_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint           not null
#  user_id       :bigint
#  workspace_id  :bigint           not null
#
# Indexes
#
#  index_workspace_histories_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_workspace_histories_on_user_id                        (user_id)
#  index_workspace_histories_on_workspace_id                   (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

require 'rails_helper'

RSpec.describe WorkspaceHistory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
