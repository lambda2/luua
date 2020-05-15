# frozen_string_literal: true

require 'rails_helper'

describe Api::WorkspaceUsersController, type: :request do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(WorkspaceUser.count).to eq(0)
  end

  let(:query) { SecureRandom.uuid }

  describe '#index' do # rubocop:todo Metrics/BlockLength

    let(:random_user) { create(:user, :confirmed) }
    let(:user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:workspace_user) { create(:workspace_user, user_id: user.id, workspace: workspace) }

    it 'Anonymous users can show workspace users' do
      workspace_user.reload
      json_get "/api/workspaces/#{workspace.slug}/workspace_users"
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(2)
    end

    it 'Random users can workspace users' do
      workspace_user.reload
      json_get "/api/workspaces/#{workspace.slug}/workspace_users", user: random_user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(2)
    end

  end

  describe '#show' do # rubocop:todo Metrics/BlockLength

    let(:user) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:workspace_user) { create(:workspace_user, user_id: user.id, workspace: workspace) }

    it 'Anonymous users can show workspace user' do
      workspace_user.reload
      json_get "/api/workspace_users/#{workspace_user.id}"
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(workspace_user)
    end

    it 'user can show workspace users' do
      workspace_user.reload
      json_get "/api/workspace_users/#{workspace_user.id}", user: user
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(workspace_user)
    end

  end

  describe '#update' do

    let(:user) { create(:user, :confirmed) }
    let(:other_user) { create(:user, :confirmed) }
    let(:admin_workspace_user) { create(:workspace_user, user: user) }
    let(:regular_workspace) { create(:workspace, :with_admin_user, user_ids: [other_user.id]) }
    let(:regular_workspace_user) { create(:workspace_user, user: user, admin: false, workspace: regular_workspace) }
    let(:other_user_workspace_user) { create(:workspace_user, workspace: admin_workspace_user.workspace) }
    let(:other_workspace_user) { create(:workspace_user) }

    it 'on our own \'s workspace_user' do
      expect(admin_workspace_user.admin).to eq(true)

      json_patch "/api/workspace_users/#{admin_workspace_user.id}", user: user, params: { workspace_user: { admin: true } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(admin_workspace_user)
      expect(response.body).to match_attributes_in_json(admin: true)
    end

    it 'on our own \'s regular workspace_user' do
      expect(regular_workspace_user.admin).to eq(false)

      json_patch "/api/workspace_users/#{regular_workspace_user.id}", user: user, params: { workspace_user: { admin: true } }.to_json
      expect(response.status).to eq(403)
    end

    it 'on a member regular workspace_user' do
      expect(other_user_workspace_user.admin).to eq(false)
      expect(user.admin_workspace_ids).to include(other_user_workspace_user.workspace_id)

      json_patch "/api/workspace_users/#{other_user_workspace_user.id}", user: user, params: { workspace_user: { admin: true } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(other_user_workspace_user)
      expect(response.body).to match_attributes_in_json(admin: true)
    end

    it 'on another workspace_user' do
      expect(other_workspace_user.admin).to eq(true)
      expect(user.admin_workspace_ids).not_to include(other_workspace_user.workspace_id)

      json_patch "/api/workspace_users/#{other_workspace_user.id}", user: user, params: { workspace_user: { admin: true } }.to_json
      expect(response.status).to eq(403)
    end
  end

end
