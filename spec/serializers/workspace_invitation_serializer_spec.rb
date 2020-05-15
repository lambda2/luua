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

describe WorkspaceInvitationSerializer do

  before :each do
    expect(WorkspaceInvitation.count).to eq(0)
    FactoryBot.create_list(:workspace_invitation, 3)
  end

  let(:workspace_invitation) { create(:workspace_invitation) }
  let(:workspace_invitations) { WorkspaceInvitation.all }

  it '#serialize' do
    serialized = JSON.parse(WorkspaceInvitationSerializer.new.serialize(workspace_invitation).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(workspace_invitation.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(workspace_invitations, each_serializer: WorkspaceInvitationSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(workspace_invitations.count)
  end
end
