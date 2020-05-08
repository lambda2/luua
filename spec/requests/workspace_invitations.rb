# frozen_string_literal: true

require 'rails_helper'

describe Api::WorkspaceInvitationsController, type: :request do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(WorkspaceInvitation.count).to eq(0)
  end

  let(:query) { SecureRandom.uuid }

  describe '#index' do

    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:member) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:workspace_invitation) { create(:workspace_invitation, inviter_id: manager.id, workspace: workspace).reload }

    it 'Anonymous users can\'t show workspace invitations' do
      json_get "/api/workspaces/#{workspace.slug}/workspace_invitations"
      expect(response.status).to eq(403)
    end

    it 'Random users can show workspace invitations' do
      json_get "/api/workspaces/#{workspace.slug}/workspace_invitations", user: random_user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(0)
    end

    it 'Manager can show workspace invitations' do
      workspace.reload
      workspace_invitation.reload
      # puts "<MA> #{manager.reload.inspect}"
      # puts "<ME> #{member.reload.inspect}"
      # puts "<W><> #{workspace.reload.inspect}"
      # puts "<W><U> #{workspace.users.reload.inspect}"
      # puts "<W><WI> #{workspace.workspace_invitations.reload.inspect}"

      json_get "/api/workspaces/#{workspace.slug}/workspace_invitations", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
    end

    it 'Member can show workspace invitations' do
      workspace.users << member
      workspace.reload
      workspace_invitation.reload

      json_get "/api/workspaces/#{workspace.slug}/workspace_invitations", user: member
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
    end

  end

  describe '#accept' do

    let(:random_user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:member) { create(:user, :confirmed) }
    let(:invited) { create(:user, :confirmed) }

    let(:workspace) do
      w = create(:workspace, :with_admin_user, user_ids: [manager.id])
      w.users << member
      w
    end

    let(:workspace_invitation) { create(:workspace_invitation, :for_user, user: invited, inviter_id: manager.id, workspace: workspace) }

    it 'Anonymous users can\'t accept workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/accept"
      expect(response.status).to eq(403)
    end

    it 'Random user can\'t accept workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/accept", user: random_user
      expect(response.status).to eq(403)
    end

    it 'manager can\'t accept his own workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/accept", user: manager
      expect(response.status).to eq(403)
    end

    it 'invited user can accept his own workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/accept", user: invited
      expect(response.status).to eq(200)
      expect(workspace_invitation.reload.status).to eq('accepted')
    end
  end

  describe '#reject' do

    let(:random_user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:member) { create(:user, :confirmed) }
    let(:invited) { create(:user, :confirmed) }

    let(:workspace) do
      w = create(:workspace, :with_admin_user, user_ids: [manager.id])
      w.users << member
      w
    end

    let(:workspace_invitation) { create(:workspace_invitation, :for_user, user: invited, inviter_id: manager.id, workspace: workspace) }

    it 'Anonymous users can\'t reject workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/reject"
      expect(response.status).to eq(403)
    end

    it 'Random user can\'t reject workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/reject", user: random_user
      expect(response.status).to eq(403)
    end

    it 'manager can\'t reject his own workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/reject", user: manager
      expect(response.status).to eq(403)
    end

    it 'invited user can reject his own workspace invitations' do
      json_patch "/api/workspace_invitations/#{workspace_invitation.id}/reject", user: invited
      expect(response.status).to eq(200)
      expect(workspace_invitation.reload.status).to eq('rejected')
    end
  end

end
