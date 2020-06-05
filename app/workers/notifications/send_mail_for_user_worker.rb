class Notifications::SendMailForUserWorker < ApplicationWorker
  include Sidekiq::Worker
  sidekiq_options queue: :notifications, retry: true, backtrace: true

  def self.schedule_for_user(user_id)
    Notifications::SendMailForUserWorker.delete_all(user_id)
    puts '[SendMailForUserWorker] Scheduling...'

    user = User.find(user_id)
    when_to_send_then = user.next_mail_schedule

    return unless when_to_send_then

    if when_to_send_then.past?
      puts '[SendMailForUserWorker] Perform now !...'
      Notifications::SendMailForUserWorker.perform_async(user_id)
    else
      puts "[SendMailForUserWorker] Perform at #{when_to_send_then}..."
      Notifications::SendMailForUserWorker.perform_at(when_to_send_then, user_id)
    end
  end

  def perform(user_id)
    user = User.find(user_id)
    min_time_to_send = user.next_mail_schedule

    return unless min_time_to_send

    notifications = user.notifications.unread
    return unless notifications.any?

    # We dont send anything if the user turned off notification mails
    return unless user.email_notifications?

    # If the user didn't login since `User::SEND_MAIL_FOR_NOTIFICATION_AFTER`
    if min_time_to_send.past?
      NotificationMailer.with(user: user, notifications: notifications).notification_summary.deliver
      user.update(notification_mail_sent_at: Time.zone.now)
    else
      # We reschedule for later
      Notifications::SendMailForUserWorker.schedule_for_user(user_id)
    end
  end
end
