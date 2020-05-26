# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::PollsController do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(Poll.count).to eq(0)
  end

  let(:admin) { create(:user, :confirmed) }
  let(:user) { create(:user, :confirmed) }
  let(:workspace) { create(:workspace, user_ids: [admin.id, user.id]) }

  describe '#index' do

    it 'everyone can see workspace public polls' do
      FactoryBot.create_list(:poll, 3, visibility: :public, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :protected, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :hidden, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :draft, workspace: workspace, user: user)

      json_get "/api/workspaces/#{workspace.id}/polls"
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

    it 'a workspace member can see workspace public and protected polls' do
      FactoryBot.create_list(:poll, 3, visibility: :public, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :protected, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :hidden, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :draft, workspace: workspace, user: user)

      json_get "/api/workspaces/#{workspace.id}/polls", user: user
      expect(response.status).to eq(200)
      # 3 public + 3 protected + 1 draft on his own
      expect(response.body).to have_item_count_in_json(9)
    end

    it 'a workspace admin can see workspace public, hidden and protected polls' do
      FactoryBot.create_list(:poll, 3, visibility: :public, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :protected, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :hidden, workspace: workspace)
      FactoryBot.create_list(:poll, 3, visibility: :draft, workspace: workspace, user: user)

      json_get "/api/workspaces/#{workspace.id}/polls", user: admin
      expect(response.status).to eq(200)
      # 3 public + 3 protected + 1 draft on his own
      expect(response.body).to have_item_count_in_json(9)
    end

  end

  describe '#show' do

    let(:poll) { create(:poll, visibility: :public, workspace: workspace) }

    it 'on a poll' do
      json_get "/api/polls/#{poll.id}"
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(poll)
    end

    it 'on a non-existing poll' do
      expect do
        json_get '/api/polls/0'
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe '#update' do

    let(:poll) { create(:poll, user: user, workspace: workspace) }
    let(:other_poll) { create(:poll) }

    it 'on an user\'s poll' do
      json_patch "/api/polls/#{poll.id}", user: user, params: { poll: { name: 'Hello world' } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(poll)
      expect(response.body).to match_attributes_in_json(name: 'Hello world')
    end

    it 'on another poll' do
      json_patch "/api/polls/#{other_poll.id}", user: user, params: { poll: { name: 'Hello world' } }.to_json
      expect(response.status).to eq(403)
    end
  end

  describe '#create' do

    let(:user) { create(:user, :confirmed) }
    let(:workspace) { create(:workspace, user_ids: [user.id]) }
    let(:other_workspace) { create(:workspace) }
    let(:poll) { build(:poll, workspace: workspace) }
    let(:poll_other_workspace) { build(:poll, workspace: other_workspace) }

    it 'Can create a poll without options' do
      json_post '/api/polls', user: user, params: { poll: poll.as_json }.to_json
      expect(response.status).to eq(422)
    end

    it 'Create a poll' do

      poll_with_options = poll.as_json.merge({
        poll_options_attributes: 3.times.map { attributes_for(:poll_option, poll: nil) }
      })
      json_post '/api/polls', user: user, params: { poll: poll_with_options }.to_json
      expect(response.status).to eq(201)
      expect(response.body).to match_attributes_in_json(poll.as_json.without('locale').select {|_k, e| e })
      expect(
        JSON.parse(response.body)['poll_options'].map {|e| e['name'] }
      ).to match_array(
        poll_with_options[:poll_options_attributes].map {|e| e[:name] }
      )
    end

    it 'Create a poll in a workspace the user isn\'t a member of' do
      json_post '/api/polls', user: user, params: { poll: poll_other_workspace.as_json }.to_json
      expect(response.status).to eq(403)
    end

  end
end
