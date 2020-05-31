class CreateStatusForMissions < ActiveRecord::Migration[6.0]
  def change
    add_column :missions, :status, :integer, default: 0, null: false
    add_column :missions, :started_at, :datetime
    add_column :missions, :completed_at, :datetime
    add_column :missions, :canceled_at, :datetime
  end
end
