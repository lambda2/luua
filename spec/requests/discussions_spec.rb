# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::DiscussionsController do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(Discussion.count).to eq(0)
    FactoryBot.create_list(:discussion, 3)
  end

  let(:user) { create(:user, :confirmed) }
  let(:workspace) { create(:user, :confirmed) }
  let(:discussion) { create(:discussion, user: user) }

  describe '#index' do

    it 'when some discussions' do
      json_get '/api/discussions'
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

  end

  describe '#show' do

    let(:discussion) { create(:discussion) }

    it 'on a discussion' do
      json_get "/api/discussions/#{discussion.id}"
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(discussion)
    end

    it 'on a non-existing discussion' do
      expect do
        json_get '/api/discussions/0'
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe '#update' do

    let(:user) { create(:user, :confirmed) }
    let(:discussion) { create(:discussion, user: user) }
    let(:other_discussion) { create(:discussion) }

    it 'on an user\'s discussion' do
      json_patch "/api/discussions/#{discussion.id}", user: user, params: { discussion: { name: 'Hello world' } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(discussion)
      expect(response.body).to match_attributes_in_json(name: 'Hello world')
    end

    it 'on another discussion' do
      json_patch "/api/discussions/#{other_discussion.id}", user: user, params: { discussion: { name: 'Hello world' } }.to_json
      expect(response.status).to eq(403)
    end
  end

  describe '#create' do

    let(:user) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, user_ids: [user.id]) }
    let(:other_workspace) { create(:workspace) }
    let(:discussion) { build(:discussion, resource: workspace) }
    let(:discussion_other_workspace) { build(:discussion, resource: other_workspace) }

    it 'Create a discussion' do
      json_post '/api/discussions', user: user, params: { discussion: discussion }.to_json
      expect(response.status).to eq(201)
      expect(response.body).to match_attributes_in_json(discussion.as_json.select {|_k, e| e })
    end

    it 'Create a discussion in a workspace the user isn\'t a member of' do
      json_post '/api/discussions', user: user, params: { discussion: discussion_other_workspace }.to_json
      expect(response.status).to eq(403)
    end

  end
end
