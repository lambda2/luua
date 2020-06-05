class EmailDeliveryObserver
  def self.delivered_email(message)
    if Rails.env.development? # rubocop:todo Style/GuardClause
      puts 'DELIVERED EMAIL ======'
      puts message.inspect
      puts '=================='
    end
  end
end

ActionMailer::Base.register_observer(EmailDeliveryObserver)
