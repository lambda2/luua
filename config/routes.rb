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

  namespace :api do
    get 'me', action: :me, controller: 'users'
    get 'me/notifications', action: :me, controller: 'notifications'

    resources :workspaces do
      resources :missions
      resources :mission_users do
        concerns :mission_users_filters
      end
    end

    resources :mission_categories
    resources :skill_categories, only: [] do
      resources :skills
    end
    resources :countries
    resources :regions
    resources :organizations

    resources :missions do
      post 'apply', on: :member
      resources :mission_users do
        concerns :mission_users_filters
      end
    end

    resources :users, only: [:update] do
      resources :notifications
    end

    resources :workspace_histories

    resources :mission_users do
      concerns :mission_users_actions
    end
  end

end
