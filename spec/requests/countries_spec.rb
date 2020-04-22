# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::CountriesController do

  VALID_COUNTRY_NAME = 'france'

  before :each do
    # We only seed with France 🇫🇷
    expect(Country.count).to eq(1)
  end

  let(:user) { create(:user, :confirmed) }
  let(:country) { Country.friendly.find(VALID_COUNTRY_NAME) }

  describe '#index' do

    it 'when not logged in' do
      json_get '/api/countries'
      expect(response.status).to eq(401)
    end

    it 'when logged in' do
      json_get '/api/countries', user: user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(1)
    end

  end

  describe '#show' do

    it 'on a country' do
      json_get "/api/countries/#{VALID_COUNTRY_NAME}", user: user
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(country)
    end

    it 'on a non-existing workspace' do
      expect do
        json_get '/api/countries/mars', user: user
      end.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'without an user' do
      json_get '/api/countries/mars'
      expect(response.status).to eq(401)
    end
  end
end
