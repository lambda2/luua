# frozen_string_literal: true

require 'rails_helper'

describe Api::MissionUsersController, type: :request do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(MissionUser.count).to eq(0)
  end

  let(:query) { SecureRandom.uuid }

  describe '#index' do # rubocop:todo Metrics/BlockLength

    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:mission) { create(:mission, visibility: :public, workspace_id: workspace.id, created_by: manager.id) }
    let(:mission_user) { create(:mission_user, user_id: candidate.id, mission_id: mission.id) }
    let(:other_mission_user) { create(:mission_user, mission_id: mission.id) }

    it 'Anonymous users can show mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users"
      expect(response.status).to eq(200)
    end

    # @TODO maybe hide them ?
    it 'Random users can\'t show other users mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users", user: random_user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(0)
    end

    it 'Candidates can\'t show other users mission users' do

      # @TODO why do we have to do this ?
      mission_user.reload

      json_get "/api/missions/#{mission.slug}/mission_users", user: candidate
      puts "Candidates: #{response.body}"
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
    end

    it 'Mission creator can show mission users' do

      # @TODO why do we have to do this ?
      mission_user.reload
      other_mission_user.reload

      json_get "/api/missions/#{mission.slug}/mission_users", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(2)
      expect(response.body).to contain_item_in_json_at(mission_user, 0)
      expect(response.body).to contain_item_in_json_at(other_mission_user, 1)
    end

  end

  describe '#show' do
    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:mission) { create(:mission, visibility: :public, workspace_id: workspace.id, created_by: manager.id) }
    let(:mission_user) { create(:mission_user, user_id: candidate.id, mission_id: mission.id) }
    let(:other_mission_user) { create(:mission_user, mission_id: mission.id) }

    # @TODO maybe hide them ?
    it 'Anonymous users can show mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users/#{mission_user.id}"
      expect(response.status).to eq(200)
    end

    # @TODO maybe hide them ?
    it 'Random users can show mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users/#{mission_user.id}", user: random_user
      expect(response.status).to eq(200)
    end

    it 'Candidates can show his own mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users/#{mission_user.id}", user: candidate
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
    end

    it 'Mission creator can show candidate mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users/#{mission_user.id}", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
    end

    it 'Mission creator can show other candidate mission users' do
      json_get "/api/missions/#{mission.slug}/mission_users/#{other_mission_user.id}", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(other_mission_user)
    end
  end

  describe '#reject' do
    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:mission) { create(:mission, visibility: :public, workspace_id: workspace.id, created_by: manager.id) }
    let(:mission_user) { create(:mission_user, user_id: candidate.id, mission_id: mission.id) }

    it 'Mission candidate can abort his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/reject", user: candidate
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
      expect(response.body).to match_attributes_in_json(status: 'rejected')

    end

    it 'Mission manager can abort his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/reject", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
      expect(response.body).to match_attributes_in_json(status: 'rejected')
    end

    it 'Random users cant abort a mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/reject", user: random_user
      expect(response.status).to eq(403)
    end
  end

  describe '#accept' do
    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:mission) { create(:mission, visibility: :public, workspace_id: workspace.id, created_by: manager.id) }
    let(:mission_user) { create(:mission_user, user_id: candidate.id, mission_id: mission.id) }

    it 'Mission candidate cant accept his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/accept", user: candidate
      expect(response.status).to eq(403)
    end

    it 'Mission manager can accept his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/accept", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
      expect(response.body).to match_attributes_in_json(status: 'accepted')
    end

    it 'Random users cant accept a mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/reject", user: random_user
      expect(response.status).to eq(403)
    end
  end

  describe '#complete' do
    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:mission) { create(:mission, visibility: :public, workspace_id: workspace.id, created_by: manager.id) }
    let(:mission_user) { create(:mission_user, user_id: candidate.id, mission_id: mission.id, status: :accepted) }

    it 'Mission candidate can complete his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/complete", user: candidate
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
      expect(response.body).to match_attributes_in_json(status: 'completed')
    end

    it 'Mission manager can complete his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/complete", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
      expect(response.body).to match_attributes_in_json(status: 'completed')
    end

    it 'Random users cant complete a mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/complete", user: random_user
      expect(response.status).to eq(403)
    end
  end

  describe '#review' do
    let(:random_user) { create(:user, :confirmed) }
    let(:candidate) { create(:user, :confirmed) }
    let(:manager) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, :with_admin_user, user_ids: [manager.id]) }
    let(:mission) { create(:mission, visibility: :public, workspace_id: workspace.id, created_by: manager.id) }
    let(:mission_user) { create(:mission_user, user_id: candidate.id, mission_id: mission.id, status: :completed) }
    let(:other_mission_user) { create(:mission_user, mission_id: mission.id) }

    it 'Mission candidate cant review his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/review", user: candidate
      expect(response.status).to eq(403)

    end

    it 'Mission manager can review his mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/review", user: manager
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission_user)
      expect(response.body).to match_attributes_in_json(status: 'reviewed')
    end

    it 'Random users cant review a mission user' do
      json_patch "/api/mission_users/#{mission_user.id}/review", user: random_user
      expect(response.status).to eq(403)
    end
  end

end
