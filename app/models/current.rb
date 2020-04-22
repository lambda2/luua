class Current < ActiveSupport::CurrentAttributes
  attribute :application, :user
  attribute :request_id, :user_agent, :ip_address

  resets { Time.zone = nil }

  def user=(user)
    super
    # self.application = user.account
    # Time.zone    = user.time_zone
  end

  def to_h
    {
      user_email: user&.email,
      application: application,
      request_id: request_id,
      user_agent: user_agent,
      ip_address: ip_address
    }
  end

  def self.load_from_h(hash)
    email = hash.deep_symbolize_keys.dig(:user_email)
    self.user = email ? User.find_by_email(email) : nil
    self.request_id = hash.deep_symbolize_keys.dig(:request_id)
    self.application = hash.deep_symbolize_keys.dig(:application)
    self.user_agent = hash.deep_symbolize_keys.dig(:user_agent)
    self.ip_address = hash.deep_symbolize_keys.dig(:ip_address)

    refresh_application! unless application
  end

  def self.refresh_application!
    if defined? Rails::Console
      self.application = "#{Rails.try(:app_class) || 'Unknown app'} console"
    elsif defined? Rails::Server
      self.application = "#{Rails.try(:app_class) || 'Unknown app'} server"
    else
      self.application ||= (Rails.try(:app_class) || 'Unknown app').to_s
    end
  end
end
