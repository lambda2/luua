class EmailDeliveryInterceptor
  def self.delivering_email(message)
    message.to = [ENV['DEVELOPMENT_MAIL_SINK']]
  end
end

unless Rails.env.production?

  # If we send mails but no sink
  if ENV['LOCAL_MAILER'] && !ENV['DEVELOPMENT_MAIL_SINK']
    raise 'Please define the DEVELOPMENT_MAIL_SINK env var in your .env.local'
  end

  ActionMailer::Base.register_interceptor(EmailDeliveryInterceptor)
end