# Preview all emails at http://localhost:3000/rails/mailers/notification
class NotificationPreview < ActionMailer::Preview

  def notification_summary
    user = User.first
    notifications = user.notifications.limit((3...10).to_a.sample)
    n = NotificationMailer.with(
      user: User.first, notifications: notifications
    ).notification_summary
  end
end
