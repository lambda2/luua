# frozen_string_literal: true

require 'rails_helper'

describe Api::WorkspaceRequestsController, type: :request do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(WorkspaceRequest.count).to eq(0)
  end

  let(:query) { SecureRandom.uuid }

  describe '#index' do # rubocop:todo Metrics/BlockLength

    let(:random_user) { create(:user, :confirmed) }
    let(:requesting_user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:member) { create(:user, :confirmed) }

    let(:workspace) do
      w = create(:workspace, :with_admin_user, user_ids: [manager.id])
      w.users << member
      w
    end

    let(:workspace_request) { create(:workspace_request, user: requesting_user, workspace: workspace).reload }

    it 'Anonymous users can\'t show workspace requests' do
      json_get "/api/workspaces/#{workspace.slug}/workspace_requests"
      expect(response.status).to eq(403)
    end

    it 'Random users can show workspace requests, but only theirs' do
      json_get "/api/workspaces/#{workspace.slug}/workspace_requests", user: random_user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(0)
    end

    it 'Manager can show workspace requests' do
      workspace.reload
      workspace_request.reload

      json_get "/api/workspaces/#{workspace.slug}/workspace_requests", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
    end

    it 'Member can show workspace requests' do
      workspace.reload
      workspace_request.reload

      json_get "/api/workspaces/#{workspace.slug}/workspace_requests", user: member
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
    end
  end

  describe '#accept' do # rubocop:todo Metrics/BlockLength

    let(:random_user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:member) { create(:user, :confirmed) }
    let(:requesting_user) { create(:user, :confirmed) }

    let(:workspace) do
      w = create(:workspace, :with_admin_user, user_ids: [manager.id])
      w.users << member
      w
    end

    let(:workspace_request) { create(:workspace_request, user: requesting_user, workspace: workspace) }

    it 'Anonymous users can\'t accept workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/accept"
      expect(response.status).to eq(403)
    end

    it 'Random user can\'t accept workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/accept", user: random_user
      expect(response.status).to eq(403)
    end

    it 'manager can accept his own workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/accept", user: manager
      expect(response.status).to eq(200)
      expect(workspace_request.reload.status).to eq('accepted')
      expect(workspace.reload.user_ids).to include(requesting_user.id)
    end

    it 'requesting user can\'t accept his own workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/accept", user: requesting_user
      expect(response.status).to eq(403)
    end
  end

  describe '#reject' do

    let(:random_user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:member) { create(:user, :confirmed) }
    let(:requesting_user) { create(:user, :confirmed) }

    let(:workspace) do
      w = create(:workspace, :with_admin_user, user_ids: [manager.id])
      w.users << member
      w
    end

    let(:workspace_request) { create(:workspace_request, user: requesting_user, workspace: workspace) }

    it 'Anonymous users can\'t reject workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/reject"
      expect(response.status).to eq(403)
    end

    it 'Random user can\'t reject workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/reject", user: random_user
      expect(response.status).to eq(403)
    end

    it 'manager can reject his own workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/reject", user: manager
      expect(response.status).to eq(200)
      expect(workspace_request.reload.status).to eq('rejected')
      expect(workspace.reload.user_ids).not_to include(requesting_user.id)
    end

    it 'requesting user can\'t reject his own workspace requests' do
      json_patch "/api/workspace_requests/#{workspace_request.id}/reject", user: requesting_user
      expect(response.status).to eq(403)
    end

  end

end
