
require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# Complete env vars with .env config file
Dotenv::Railtie.load

module Luua
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.api_only = true

    # We throttle the requests
    config.middleware.use Rack::Attack

    Raven.configure do |config|
      config.dsn = ENV['SENTRY_DSN']
      config.environments = %w[production]
    end

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://luua.io', %r{\Ahttp://.*\.luua.io\z}
        resource '*',
                 headers: %w[Authorization],
                 methods: :any,
                 expose: %w[Authorization],
                 max_age: 600
      end
      allow do
        origins %r{\Ahttp://localhost:(3000|3232)}
        resource '*',
                 headers: %w[Authorization],
                 methods: :any,
                 expose: %w[Authorization],
                 max_age: 600
      end
    end

    # config.middleware.insert_before Warden::Manager, ActionDispatch::Cookies
    # config.middleware.insert_before Warden::Manager, ActionDispatch::Session::CookieStore

    config.action_cable.mount_path = '/cable'
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

  end
end
