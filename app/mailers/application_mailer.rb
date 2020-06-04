class ApplicationMailer < ActionMailer::Base
  default from: "Luua <#{ENV['MAIL_SENDER'] || 'hello@luua.io'}>"
  layout 'mailer'
end
