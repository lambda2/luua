# == Schema Information
#
# Table name: workspaces_users
#
#  id           :bigint           not null, primary key
#  admin        :boolean          default(FALSE), not null
#  role         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_workspaces_users_on_user_id       (user_id)
#  index_workspaces_users_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#


require 'rails_helper'

RSpec.describe WorkspacesUser, type: :model do
  # it 'Can be created' do
  #   workspaces_user = create(:workspaces_user)
  #   expect(workspaces_user).not_to be(nil)
  # end
end
