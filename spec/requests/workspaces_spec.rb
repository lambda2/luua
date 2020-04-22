# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::WorkspacesController do

  before :each do
    expect(Workspace.count).to eq(0)
    FactoryBot.create_list(:workspace, 3)
  end

  describe '#index' do

    it 'when some workspaces in json' do
      json_get '/api/workspaces'
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

  end

  describe '#show' do

    let(:good_workspace) { create(:workspace) }

    it 'on a workspace' do
      json_get "/api/workspaces/#{good_workspace.id}"
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(good_workspace)
    end

    it 'on a non-existing workspace' do
      expect do
        json_get '/api/workspaces/0'
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
