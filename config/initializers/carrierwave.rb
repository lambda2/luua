module CarrierWave
  module MiniMagick
    def quality(percentage)
      manipulate! do |img|
        img.quality(percentage.to_s)
        img = yield(img) if block_given?
        img
      end
    end
  end
end

# Use local storage if in development or test
if Rails.env.development? || Rails.env.test?
  CarrierWave.configure do |config|
    config.storage = :file
    config.enable_processing = false
  end
else
  CarrierWave.configure do |config|
    config.storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['DO_SPACE_API_KEY'],
      aws_secret_access_key: ENV['DO_SPACE_API_SECRET'],
      region: 'us-east-1',
      endpoint: 'https://fra1.digitaloceanspaces.com'
    }

    config.asset_host = ENV['CDN_URL'] || 'https://luua.fra1.digitaloceanspaces.com'
    config.fog_directory  = 'luua'
    config.fog_attributes = { 'Cache-Control' => 'max-age=315576000' }
  end
end
