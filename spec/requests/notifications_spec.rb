# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::NotificationsController do # rubocop:todo Metrics/BlockLength

  before :each do
    expect(Notification.count).to eq(0)
  end

  describe '#index' do

    let(:user) { create(:user, :confirmed) }

    it 'show my notifications if im logged' do
      json_get '/api/me/notifications'
      expect(response.status).to eq(401)
    end

    it 'show my notifications' do
      FactoryBot.create_list(:notification, 3, user: user)
      json_get '/api/me/notifications', user: user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

  end

  # describe '#show' do

  #   let(:notification) { create(:notification) }

  #   it 'on a notification' do
  #     json_get "/api/notifications/#{notification.id}"
  #     expect(response.status).to eq(200)
  #     expect(response.body).to match_item_in_json(notification)
  #   end

  #   it 'on a non-existing notification' do
  #     expect do
  #       json_get '/api/notifications/0'
  #     end.to raise_error(ActiveRecord::RecordNotFound)
  #   end
  # end

  describe '#read' do

    let(:user) { create(:user, :confirmed) }
    let(:notification) { create(:notification, user: user) }
    let(:other_notification) { create(:notification) }

    it 'on an user\'s notification' do
      json_patch "/api/notifications/#{notification.id}/read", user: user
      expect(response.status).to eq(200)
      expect(response.body).to match_item_in_json(notification)
    end

    it 'on another notification' do
      json_patch "/api/notifications/#{other_notification.id}/read", user: user
      expect(response.status).to eq(403)
    end
  end

  describe '#read_all' do

    let(:user) { create(:user, :confirmed) }

    it 'on an user\'s notification' do
      FactoryBot.create_list(:notification, 3, user: user)
      json_patch '/api/notifications/read_all', user: user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(0)
    end
  end

end
