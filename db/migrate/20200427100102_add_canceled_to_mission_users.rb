class AddCanceledToMissionUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :mission_users, :canceled_at, :datetime
  end
end
