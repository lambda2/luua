class AddLastNotificationMail < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :notification_mail_sent_at, :datetime
  end
end
