source 'https://rubygems.org'
git_source(:github) {|repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.0'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.12'

gem 'acts_as_list'
gem 'countries'

# Auth / roles stuff
gem 'cancancan'
gem 'devise'
gem 'devise-jwt', '~> 0.5.9'

# CORS
gem 'rack-cors'

gem 'has_scope'
gem 'kaminari'
gem 'panko_serializer'
gem 'rack-attack'
gem 'redis'
gem 'responders'
gem 'sidekiq'

gem 'httparty'
gem 'redis-namespace'
gem 'rufus-scheduler', '~> 3.4.0'
gem 'sidekiq-cron', '~> 0.6.3'

gem 'interactor-rails'

gem 'friendly_id', '~> 5.2.4'

# State machines
gem 'aasm'

# i18n
gem 'globalize'
gem 'globalize-accessors'
gem 'route_translator'

# Errors & reporting
gem 'appsignal'
gem 'sentry-raven'

# Pg analytics
gem 'pg_query', '>= 0.9.0'
gem 'pghero'

# Memcached
gem 'dalli'

gem 'groupdate'

# compression
gem 'zlib'

# Upload
gem 'carrierwave'
gem 'carrierwave-base64'
gem 'mini_magick', '~> 4.8'

# Slack
gem 'slack-ruby-client'

# Swagger (API documentaiton)
gem 'rswag-api'
gem 'rswag-ui'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  gem 'annotate'
  gem 'apparition'
  gem 'brakeman'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara' # Capybara, the library that allows us to interact with the browser using Ruby
  gem 'coveralls', require: false
  gem 'database_cleaner'
  gem 'dotenv-rails'
  gem 'factory_bot'
  gem 'faker', '~> 2.1.2'
  gem 'foreman'
  gem 'json_spec'
  gem 'marginalia' # annotate queries
  gem 'ngrok-tunnel'
  gem 'rspec'
  gem 'rspec-rails', '~> 3.8'
  gem 'rswag-specs'
  gem 'rubocop', '~> 0.80', require: false
  gem 'webdrivers' # This gem helps Capybara interact with the web browser.
  gem 'webmock' # Mock http calls
end

group :development do

  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
