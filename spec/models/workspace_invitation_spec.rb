# == Schema Information
#
# Table name: workspace_invitations
#
#  id           :bigint           not null, primary key
#  email        :string
#  send_email   :boolean          default(FALSE), not null
#  status       :integer          default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  inviter_id   :bigint           not null
#  user_id      :bigint
#  workspace_id :bigint
#
# Indexes
#
#  index_workspace_invitations_on_inviter_id    (inviter_id)
#  index_workspace_invitations_on_user_id       (user_id)
#  index_workspace_invitations_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (inviter_id => users.id)
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
require 'rails_helper'

RSpec.describe WorkspaceInvitation, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
