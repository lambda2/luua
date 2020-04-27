# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::RegionsController do # rubocop:todo Metrics/BlockLength

  VALID_REGION_NAME = 'internet'

  before :each do
    expect(Region.count).to eq(3)
  end

  let(:user) { create(:user, :confirmed) }
  let(:region) { Region.friendly.find(VALID_REGION_NAME) }

  describe '#index' do

    it 'when not logged in' do
      json_get '/api/regions'
      expect(response.status).to eq(401)
    end

    it 'when logged in' do
      json_get '/api/regions', user: user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

  end

  describe '#show' do

    it 'on a region' do
      json_get "/api/regions/#{VALID_REGION_NAME}", user: user
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(region)
    end

    it 'on a non-existing workspace' do
      expect do
        json_get '/api/regions/space', user: user
      end.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'without an user' do
      json_get "/api/regions/#{VALID_REGION_NAME}"
      expect(response.status).to eq(401)
    end
  end
end
