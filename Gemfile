source 'https://rubygems.org'
git_source(:github) {|repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.2'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.2.3'
# Use Puma as the app server
gem 'puma', '~> 3.12.4'

gem 'acts_as_list', '~> 1.0.1'
gem 'countries', '~> 3.0.1'

# Auth / roles stuff
gem 'cancancan', '~> 3.1.0'
gem 'devise', '~> 4.7.1'
gem 'devise-jwt', '~> 0.6.0'

# CORS
gem 'rack-cors', '~> 1.1.1'

gem 'api-pagination'
gem 'has_scope', '~> 0.7.2'
gem 'kaminari', '~> 1.2.0'
gem 'panko_serializer', '~> 0.7.3'
gem 'rack-attack', '~> 6.2.2'
gem 'redis', '~> 4.1.3'
gem 'responders', '~> 3.0.0'
gem 'sidekiq', '~> 6.0.7'

gem 'httparty', '~> 0.18.0'
gem 'redis-namespace', '~> 1.7.0'
gem 'rufus-scheduler', '~> 3.4.2'
gem 'sidekiq-cron', '~> 0.6.3'

gem 'interactor-rails', '~> 2.2.1'

gem 'friendly_id', '~> 5.2.5'
gem 'counter_culture', '~> 2.0'

# analytics
gem 'ahoy_matey'

# Colors
gem 'colorize'

# State machines
gem 'aasm', '~> 5.0.8'

# i18n
gem 'devise-i18n'
gem 'globalize', '~> 5.3.0'
gem 'globalize-accessors', '~> 0.2.1'
gem 'i18n-tasks', '~> 0.9.31'
gem 'rack-contrib'

# Errors & reporting
gem 'appsignal', '~> 2.10.5'
gem 'sentry-raven', '~> 3.0.0'

# Pg analytics
gem 'pg_query', '~> 1.2.0'
gem 'pghero', '~> 2.4.2'

# Memcached
gem 'dalli', '~> 2.7.10'

gem 'groupdate', '~> 5.0.0'

# compression
gem 'zlib', '~> 1.1.0'

# Upload
gem 'carrierwave', '~> 2.1.0'
gem 'carrierwave-base64', '~> 2.8.1'
gem 'fog-aws' # For DigitalOcean
gem 'mini_magick', '~> 4.10.1'

# Slack
gem 'slack-ruby-client', '~> 0.14.6'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '~> 1.4.6', require: false

group :development, :test do
  gem 'annotate', '~> 3.1.1'
  gem 'apparition', '~> 0.5.0'
  gem 'brakeman', '~> 4.8.1'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '~> 11.1.2', platforms: %i[mri mingw x64_mingw]
  gem 'capybara', '~> 3.32.1' # Capybara, the library that allows us to interact with the browser using Ruby
  gem 'coveralls', '~> 0.8.23', require: false
  gem 'database_cleaner', '~> 1.8.4'
  gem 'dotenv-rails', '~> 2.7.5'
  gem 'factory_bot', '~> 5.1.2'
  gem 'faker', '~> 2.1.2'
  gem 'foreman', '~> 0.87.1'
  gem 'json_spec', '~> 1.1.5'
  gem 'marginalia', '~> 1.8.0' # annotate queries
  gem 'ngrok-tunnel', '~> 2.1.1'
  gem 'rspec', '~> 3.9.0'
  gem 'rspec-rails', '~> 3.9.1'
  gem 'rubocop', '~> 0.80.0', require: false
  gem 'webdrivers', '~> 4.3.0' # This gem helps Capybara interact with the web browser.
  gem 'webmock', '~> 3.8.3' # Mock http calls
end

group :development do

  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '~> 3.1.5'
  gem 'web-console', '~> 4.0.1'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '~> 2.1.0'
  gem 'spring-watcher-listen', '~> 2.0.1'
end

group :test do
  gem 'simplecov', '~> 0.16', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
