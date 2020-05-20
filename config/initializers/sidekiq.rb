Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'] || 'redis://127.0.0.1:6379', namespace: "sidekiq_luua_#{Rails.env}" }

  schedule_file = 'config/schedule.yml'

  Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file) if File.exist?(schedule_file)
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'] || 'redis://127.0.0.1:6379', namespace: "sidekiq_luua_#{Rails.env}" }
end
