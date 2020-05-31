# frozen_string_literal: true

require 'rails_helper'

describe Api::MissionsController, type: :request do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(Mission.count).to eq(0)
    FactoryBot.create_list(:mission, 3, visibility: :public)
  end

  let(:query) { SecureRandom.uuid }

  describe '#index' do # rubocop:todo Metrics/BlockLength

    it 'when some missions' do
      json_get '/api/missions'
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

    it 'when searching a mission that doesn\'t exists' do
      json_get '/api/missions', params: { q: query }
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(0)
    end

    it 'when searching a mission by name' do
      good_mission = create(:mission, name: "This is #{query} !", visibility: :public)
      json_get '/api/missions', params: { q: query }
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
      expect(response.body).to contain_item_in_json_at(good_mission, 0)
    end

    it 'when searching a mission by workspace' do
      good_mission = create(:mission, visibility: :public, workspace: create(:workspace, name: "This is #{query} !"))
      json_get '/api/missions', params: { q: query }
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
      expect(response.body).to contain_item_in_json_at(good_mission, 0)
    end

    context 'with protected visibility' do

      let(:user) { create(:user, :confirmed) }
      let(:good_workspace) { create(:workspace, user_ids: [user.id]) }
      let(:good_mission) { create(:mission, visibility: :protected, workspace: good_workspace) }
      let(:invisible_mission) { create(:mission, visibility: :protected) }

      before(:each) do
        expect(good_mission.persisted?).to be(true)
      end

      it 'show all missions' do
        json_get '/api/missions', user: user
        expect(response.status).to eq(200)
        expect(response.body).to have_item_count_in_json(4)
      end

      it 'show workspace missions' do
        json_get "/api/workspaces/#{good_workspace.slug}/missions", user: user
        expect(response.status).to eq(200)
        expect(response.body).to have_item_count_in_json(1)
      end

    end

    context 'with hidden visibility' do # rubocop:todo Metrics/BlockLength

      let(:user) { create(:user, :confirmed) }
      let(:good_workspace) { create(:workspace, user_ids: [user.id]) }
      let(:admin_workspace) { create(:workspace, :with_admin_user, user_ids: [user.id]) }
      let(:good_mission) { create(:mission, visibility: :hidden, created_by: user.id, workspace: good_workspace) }
      let(:unowned_mission) { create(:mission, visibility: :hidden, workspace: good_workspace) }
      let(:unowned_admin_mission) { create(:mission, visibility: :hidden, workspace: admin_workspace) }
      let(:unowned_other_mission) { create(:mission, visibility: :hidden) }

      before(:each) do
        expect(good_mission.persisted?).to be(true)
        puts user.inspect
        puts good_workspace.workspace_users.inspect
        puts admin_workspace.workspace_users.inspect
      end

      it 'show all missions' do
        json_get '/api/missions', user: user
        expect(response.status).to eq(200)
        expect(response.body).to contain_item_in_json(good_mission)
        expect(response.body).not_to contain_item_in_json(unowned_admin_mission)
        expect(response.body).not_to contain_item_in_json(unowned_mission)
        expect(response.body).not_to contain_item_in_json(unowned_other_mission)
      end

      it 'show regular workspace missions' do
        json_get "/api/workspaces/#{good_workspace.slug}/missions", user: user
        expect(response.status).to eq(200)
        expect(response.body).to contain_item_in_json(good_mission)
        expect(response.body).not_to contain_item_in_json(unowned_mission)
        expect(response.body).not_to contain_item_in_json(unowned_admin_mission)
        expect(response.body).not_to contain_item_in_json(unowned_other_mission)
      end

      it 'show admin workspace missions' do
        json_get "/api/workspaces/#{admin_workspace.slug}/missions", user: user
        expect(response.status).to eq(200)
        expect(response.body).not_to contain_item_in_json(unowned_admin_mission)
        expect(response.body).not_to contain_item_in_json(unowned_mission)
        expect(response.body).not_to contain_item_in_json(good_mission)
        expect(response.body).not_to contain_item_in_json(unowned_other_mission)
      end

    end

    context 'with draft visibility' do # rubocop:todo Metrics/BlockLength

      let(:user) { create(:user, :confirmed) }
      let(:good_workspace) { create(:workspace, user_ids: [user.id]) }
      let(:admin_workspace) { create(:workspace, :with_admin_user, user_ids: [user.id]) }
      let(:good_mission) { create(:mission, visibility: :draft, created_by: user.id, workspace: good_workspace) }
      let(:unowned_mission) { create(:mission, visibility: :draft, workspace: good_workspace) }
      let(:unowned_admin_mission) { create(:mission, visibility: :draft, workspace: admin_workspace) }
      let(:unowned_other_mission) { create(:mission, visibility: :draft) }

      before(:each) do
        expect(good_mission.persisted?).to be(true)
      end

      it 'show all missions' do
        json_get '/api/missions', user: user
        expect(response.status).to eq(200)
        expect(response.body).to contain_item_in_json(good_mission)
        expect(response.body).not_to contain_item_in_json(unowned_admin_mission)
        expect(response.body).not_to contain_item_in_json(unowned_mission)
        expect(response.body).not_to contain_item_in_json(unowned_other_mission)
      end

      it 'show regular workspace missions' do
        json_get "/api/workspaces/#{good_workspace.slug}/missions", user: user
        expect(response.status).to eq(200)
        expect(response.body).to contain_item_in_json(good_mission)
        expect(response.body).not_to contain_item_in_json(unowned_mission)
        expect(response.body).not_to contain_item_in_json(unowned_admin_mission)
        expect(response.body).not_to contain_item_in_json(unowned_other_mission)
      end

      it 'show admin workspace missions' do
        json_get "/api/workspaces/#{admin_workspace.slug}/missions", user: user
        expect(response.status).to eq(200)
        expect(response.body).not_to contain_item_in_json(unowned_admin_mission)
        expect(response.body).not_to contain_item_in_json(unowned_mission)
        expect(response.body).not_to contain_item_in_json(good_mission)
        expect(response.body).not_to contain_item_in_json(unowned_other_mission)
      end

    end
  end

  describe '#show' do

    let(:good_mission) { create(:mission, visibility: :public) }

    it 'on a mission' do
      json_get "/api/missions/#{good_mission.id}"
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(good_mission)
    end

    it 'on a non-existing mission' do
      expect do
        json_get '/api/missions/0'
      end.to raise_error(ActiveRecord::RecordNotFound)
    end

    context 'with protected visibility' do

      let(:user) { create(:user, :confirmed) }
      let(:good_workspace) { create(:workspace, user_ids: [user.id]) }
      let(:good_mission) { create(:mission, visibility: :protected, workspace: good_workspace) }
      let(:invisible_mission) { create(:mission, visibility: :protected) }

      before(:each) do
        expect(good_mission.persisted?).to be(true)
      end

      it 'on a protected mission' do
        json_get "/api/missions/#{good_mission.id}", user: user
        expect(response.status).to eq(200)
        expect(response.body).to match_item_in_json(good_mission)
      end

      it 'on a invisible mission' do
        json_get "/api/missions/#{invisible_mission.id}", user: user
        expect(response.status).to eq(403)
      end

    end
  end

  describe '#apply' do

    let(:public_mission) { create(:mission, visibility: :public) }
    let(:protected_mission) { create(:mission, visibility: :protected) }
    let(:invisible_mission) { create(:mission, visibility: :hidden) }
    let(:candidate) { create(:user, :confirmed) }

    it 'on a public mission' do
      json_post "/api/missions/#{public_mission.id}/apply", user: candidate
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(public_mission.reload.mission_users.last)
    end

    it 'on a protected mission' do
      pending 'Applying to a protected mission should be forbidden (currently allowed)'
      json_post "/api/missions/#{protected_mission.id}/apply", user: candidate
      expect(response.status).to eq(401)
    end

    it 'on a invisible mission' do
      pending 'Applying to a invisible mission should be forbidden (currently allowed)'
      json_post "/api/missions/#{invisible_mission.id}/apply", user: candidate
      expect(response.status).to eq(401)
    end

  end

  describe '#update' do

    let(:user) { create(:user, :confirmed) }
    let(:mission) { create(:mission, created_by: user.id) }
    let(:other_mission) { create(:mission) }

    it 'on an user\'s mission' do
      json_patch "/api/missions/#{mission.id}", user: user, params: { mission: { name: 'Hello world' } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(mission)
      expect(response.body).to match_attributes_in_json(name: 'Hello world')
    end

    it 'on another mission' do
      json_patch "/api/missions/#{other_mission.id}", user: user, params: { mission: { name: 'Hello world' } }.to_json
      expect(response.status).to eq(403)
    end
  end

  describe '#create' do

    let(:user) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, user_ids: [user.id]) }
    let(:mission) { build(:mission, workspace_id: workspace.id) }
    let(:mission_start) { build(:mission, workspace_id: workspace.id, begin_at: 2.days.from_now) }
    let(:mission_without_workspace) { build(:mission) }

    it 'Create a mission without start' do
      json_post '/api/missions', user: user, params: { mission: mission }.to_json
      expect(response.status).to eq(201)
      expect(response.body).to match_attributes_in_json({
        name: mission[:name],
        description: mission[:description],
        workspace_id: mission[:workspace_id],
        visibility: mission[:visibility],
        hiring_validation: mission[:hiring_validation],
        status: "started",
      })
    end

    it 'Create a mission with a start' do
      json_post '/api/missions', user: user, params: { mission: mission_start }.to_json
      expect(response.status).to eq(201)
      expect(response.body).to match_attributes_in_json({
        name: mission_start[:name],
        description: mission_start[:description],
        workspace_id: mission_start[:workspace_id],
        visibility: mission_start[:visibility],
        hiring_validation: mission_start[:hiring_validation],
        status: "open",
      })
    end

    it 'Create a mission without a workspace' do
      json_post '/api/missions', user: user, params: { mission: mission_without_workspace }.to_json
      expect(response.status).to eq(422)
    end

  end
end
