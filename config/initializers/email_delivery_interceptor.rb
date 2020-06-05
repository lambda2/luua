class EmailDeliveryInterceptor
  def self.delivering_email(message)
    message.to = [ENV['DEVELOPMENT_MAIL_SINK']]
  end
end

if Rails.env.development?

  # If we send mails but no sink
  raise 'Please define the DEVELOPMENT_MAIL_SINK env var in your .env.local' if ENV['LOCAL_MAILER'] && !ENV['DEVELOPMENT_MAIL_SINK']

  ActionMailer::Base.register_interceptor(EmailDeliveryInterceptor)
end
