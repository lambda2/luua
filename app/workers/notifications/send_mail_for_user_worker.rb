class Notifications::SendMailForUserWorker < ApplicationWorker
  include Sidekiq::Worker
  sidekiq_options queue: :notifications, retry: true, backtrace: true

  def self.schedule_for_user(user_id)
    Notifications::SendMailForUserWorker.delete_all(user_id)
    puts '[SendMailForUserWorker] Scheduling...'

    user = User.find(user_id)
    last_connexion = [user.notification_mail_sent_at, user.current_sign_in_at].compact.max

    return unless last_connexion

    when_to_send_then = last_connexion + User::SEND_MAIL_FOR_NOTIFICATION_AFTER

    if when_to_send_then.past?
      puts '[SendMailForUserWorker] Perform now !...'
      Notifications::SendMailForUserWorker.perform_async(user_id)
    else
      puts "[SendMailForUserWorker] Perform at #{when_to_send_then}..."
      Notifications::SendMailForUserWorker.perform_at(when_to_send_then, user_id)
    end
  end

  def perform(user_id) # rubocop:todo Metrics/PerceivedComplexity
    user = User.find(user_id)

    min_time = User::SEND_MAIL_FOR_NOTIFICATION_AFTER.ago
    last_connexion = [user.notification_mail_sent_at, user.current_sign_in_at].compact.max

    return unless last_connexion

    notifications = user.notifications.unread
    puts "[SendMailForUserWorker] min_time=#{min_time} last_connexion=#{last_connexion} notifications=#{notifications}"

    puts '[SendMailForUserWorker] No new notifications, skipping...' unless notifications.any?
    return unless notifications.any?

    puts '[SendMailForUserWorker] Mail notifications disabled...' unless user.email_notifications?
    # We dont send anything if the user turned off notification mails
    return unless user.email_notifications?

    # If the user didn't login since `User::SEND_MAIL_FOR_NOTIFICATION_AFTER`
    if last_connexion.before?(min_time) && notifications.any?
      NotificationMailer.with(user: user, notifications: notifications).notification_summary.deliver
      user.update(notification_mail_sent_at: Time.zone.now)
    else
      # We reschedule for later
      Notifications::SendMailForUserWorker.schedule_for_user(user_id)
    end
  end
end
