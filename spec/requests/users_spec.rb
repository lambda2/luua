# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::UsersController do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(User.count).to eq(0)
  end

  describe '#me' do
    let(:user) { create(:user, :confirmed) }

    it 'anonymous cant me' do
      json_get "/api/me"
      expect(response.status).to eq(401)
    end

    it 'user can me' do
      json_get "/api/me", user: user
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(user)
    end

  end

  describe '#show' do

    let(:user) { create(:user, :confirmed) }
    let(:other_user) { create(:user, :confirmed) }

    it 'on self' do
      json_get "/api/users/#{user.id}", user: user
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(user)
    end

    it 'on another' do
      json_get "/api/users/#{other_user.id}", user: user
      expect(response.status).to eq(200)
      puts response.body
      expect(response.body).to match_item_in_json(other_user)
    end

    it 'on a non-existing user' do
      expect do
        json_get "/api/users/0"
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe '#update' do

    let(:user) { create(:user, :confirmed) }
    let(:other_user) { create(:user, :confirmed) }

    it 'can update self' do
      json_patch "/api/users/#{user.id}", user: user, params: { user: { first_name: 'Richard' } }.to_json
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(user)
      expect(response.body).to match_attributes_in_json(first_name: 'Richard')
    end

    it 'on another user' do
      json_patch "/api/users/#{other_user.id}", user: user, params: { user: { first_name: 'Richard' } }.to_json
      expect(response.status).to eq(403)
    end
  end
end
