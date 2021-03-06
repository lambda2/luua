require 'rails_helper'

RSpec.describe 'POST /users', type: :request do
  let(:url) { '/users' }
  let(:params) do
    {
      user: {
        email: 'user@example.com',
        password: 'password'
      }
    }
  end

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 201
    end

    it 'returns a new user' do
      expect(response.body).to have_json_path('id')
    end
  end

  context 'when user already exists' do
    before do
      create :user, email: params[:user][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 422
    end

    it 'returns validation errors' do
      expect(response.body).to have_json_path('errors')
    end
  end
end
