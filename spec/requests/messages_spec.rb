# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::MessagesController do # rubocop:todo Metrics/BlockLength


  before :each do
    expect(Message.count).to eq(0)
  end

  let(:user) { create(:user, :confirmed) }
  let(:workspace) { create(:user, :confirmed) }
  let(:discussion) { create(:discussion, user: user) }


  describe '#index' do

    # it 'cant index all messages' do
    #   json_get '/api/messages'
    #   expect(response.status).to eq(404)
    #   expect(response.body).to have_item_count_in_json(3)
    # end

    it 'cant index all messages' do
      FactoryBot.create_list(:message, 3, discussion: discussion)
      FactoryBot.create_list(:message, 3)
      json_get "/api/discussions/#{discussion.id}/messages"
      expect(response.status).to eq(200)
      # 3 messages + the discussion initial message
      expect(response.body).to have_item_count_in_json(4)
    end

  end

  describe '#show' do

    let(:message) { create(:message) }

    it 'on a message' do
      json_get "/api/messages/#{message.id}"
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(message)
    end

    it 'on a non-existing message' do
      expect do
        json_get '/api/messages/0'
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end


  describe '#update' do

    let(:user) { create(:user, :confirmed) }
    let(:message) { create(:message, user: user) }
    let(:other_message) { create(:message) }

    it 'on an user\'s message' do
      json_patch "/api/messages/#{message.id}", user: user, params: { message: { content: 'Hello world' } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(message)
      expect(response.body).to match_attributes_in_json(content: 'Hello world')
    end

    it 'on another message' do
      json_patch "/api/messages/#{other_message.id}", user: user, params: { message: { content: 'Hello world' } }.to_json
      expect(response.status).to eq(403)
    end
  end

  describe '#create' do

    let(:user) { create(:user, :confirmed) }
    let(:discussion) { create(:discussion, user_id: user.id) }
    let(:other_discussion) { create(:discussion) }
    let(:message) { build(:message, discussion: discussion) }
    let(:message_other_discussion) { build(:message, discussion: other_discussion) }

    it 'Create a message' do
      json_post "/api/discussions/#{discussion.id}/messages", user: user, params: { message: message }.to_json
      expect(response.status).to eq(201)
      expect(response.body).to match_attributes_in_json(message.as_json.select {|_k, e| e })
    end

    it 'Create a message in a discussion in a workspace the user isn\'t a member of' do
      json_post "/api/discussions/#{other_discussion.id}/messages", user: user, params: { message: message_other_discussion }.to_json
      expect(response.status).to eq(403)
    end

  end

  describe '#vote' do

    let(:user) { create(:user, :confirmed) }
    let(:message) { create(:message, user_id: user.id) }


    it 'Create a vote' do
      # We create a vote
      json_post "/api/messages/#{message.id}/vote", user: user, params: { message_vote: { vote: "positive" } }.to_json
      expect(response.status).to eq(201)
      expect(response.body).to match_attributes_in_json({ message_id: message.id, user_id: user.id, vote: "positive" })

      # We change it
      json_post "/api/messages/#{message.id}/vote", user: user, params: { message_vote: { vote: "negative" } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_attributes_in_json({ message_id: message.id, user_id: user.id, vote: "negative" })

      # We cancel it
      json_post "/api/messages/#{message.id}/vote", user: user, params: { message_vote: { vote: "negative" } }.to_json
      expect(response.status).to eq(204)
      expect(response.body).to eq('')
    end

  end
end
