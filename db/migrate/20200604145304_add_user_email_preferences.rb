class AddUserEmailPreferences < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :email_newsletters, :boolean, null: false, default: true
    add_column :users, :email_notifications, :boolean, null: false, default: true
    add_column :users, :tac, :boolean, null: false, default: true
  end
end
