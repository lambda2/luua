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
        puts good_workspace.workspaces_users.inspect
        puts admin_workspace.workspaces_users.inspect
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
end