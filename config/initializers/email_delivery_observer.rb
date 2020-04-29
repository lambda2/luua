class EmailDeliveryObserver
  def self.delivered_email(message)
    puts 'DELIVERED EMAIL ======'
    puts message.inspect
    puts '=================='
  end
end

ActionMailer::Base.register_observer(EmailDeliveryObserver)
