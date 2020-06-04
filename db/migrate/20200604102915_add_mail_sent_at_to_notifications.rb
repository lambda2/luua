class AddMailSentAtToNotifications < ActiveRecord::Migration[6.0]
  def change
    add_column :notifications, :mailed_at, :datetime
  end
end
