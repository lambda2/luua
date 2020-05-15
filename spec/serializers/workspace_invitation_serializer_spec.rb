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
