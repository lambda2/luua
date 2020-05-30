Rails.application.routes.draw do # rubocop:todo Metrics/BlockLength

  root 'home#index'

  concern :mission_users_filters do |options|
    get :applied, { on: :collection, action: :index, applied: true }.merge(options)
    get :rejected, { on: :collection, action: :index, rejected: true }.merge(options)
    get :accepted, { on: :collection, action: :index, accepted: true }.merge(options)
    get :completed, { on: :collection, action: :index, completed: true }.merge(options)
    get :reviewed, { on: :collection, action: :index, reviewed: true }.merge(options)
    get :contributors, { on: :collection, action: :index, contributors: true }.merge(options)
  end

  concern :mission_users_actions do |options|
    patch :reject, { on: :member }.merge(options)
    patch :accept, { on: :member }.merge(options)
    patch :complete, { on: :member }.merge(options)
    patch :review, { on: :member }.merge(options)
  end

  devise_for :users, defaults: { format: :json }

  namespace :api do # rubocop:todo Metrics/BlockLength
    get 'stats', action: :index, controller: 'stats'
    
    get 'me', action: :me, controller: 'users'
    get 'me/notifications', action: :me, controller: 'notifications'
    get 'me/workspaces', action: :me, controller: 'workspaces'

    resources :workspaces do
      post 'invite', on: :member, action: :invite
      post 'join', on: :member, action: :join
      get 'categories', on: :member, action: :categories

      resources :missions
      resources :discussions, shallow: true
      resources :polls, shallow: true
      resources :discussion_categories, shallow: true do
        resources :discussions, shallow: true
      end

      resources :discussion_readings, shallow: true, only: :index do
        get 'mines', on: :collection, action: :mines
      end

      resources :workspace_users, shallow: true
      resources :workspace_invitations, shallow: true do
        patch :accept, on: :member
        patch :reject, on: :member
      end

      resources :workspace_requests, shallow: true do
        patch :accept, on: :member
        patch :reject, on: :member
      end

      resources :workspace_histories, shallow: true

      resources :mission_users do
        concerns :mission_users_filters
      end
    end

    resources :mission_categories

    resources :skill_categories, only: [] do
      resources :skills, shallow: true
    end

    resources :countries
    resources :regions
    resources :organizations

    resources :missions do
      post 'apply', on: :member
      resources :mission_users do
        concerns :mission_users_filters
      end
      resources :discussions, shallow: true
    end

    resources :users, only: %i[update show] do
      resources :notifications
      resources :mission_users, only: [:index]
      resources :workspace_users, only: [:index]
    end
    resources :notifications do
      patch :read, on: :member
      patch :read_all, on: :collection
    end

    resources :mission_users do
      concerns :mission_users_actions
    end

    resources :polls, shallow: true do
      get 'results', on: :member, action: :results
      post 'vote', on: :member, action: :vote
      patch 'close', on: :member, action: :close
      resources :user_votes do
        get 'mines', on: :collection, action: :mines
      end
    end

    resources :discussions, shallow: true do
      patch 'read', on: :member, action: :update_reading
      patch 'lock', on: :member, action: :lock

      resources :message_votes do
        get 'mines', on: :collection, action: :mines
      end

      resources :messages, shallow: true do
        post 'vote', on: :member, action: :vote
      end

      resources :discussion_readings, shallow: true, only: :index
    end
  end

  scope 'dbg' do
    require 'sidekiq/web'
    require 'sidekiq/cron/web'

    if Rails.env.production?
      Sidekiq::Web.use Rack::Auth::Basic do |username, password|
        # Protect against timing attacks:
        # - See https://codahale.com/a-lesson-in-timing-attacks/
        # - See https://thisdata.com/blog/timing-attacks-against-string-comparison/
        # - Use & (do not use &&) so that it doesn't short circuit.
        # - Use digests to stop length information leaking (see also ActiveSupport::SecurityUtils.variable_size_secure_compare)
        ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username), ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_USERNAME'])) &
          ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password), ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_PASSWORD']))
      end
    end

    mount PgHero::Engine, at: 'pghero'

    mount Sidekiq::Web => '/sidekiq'
  end
end
