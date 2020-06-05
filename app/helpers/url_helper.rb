module UrlHelper
  def app_url
    ENV['APP_HOST']
  end

  def notification_url(id)
    "#{app_url}/profile/read/#{id}"
  end
end
