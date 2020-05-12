class AddCounters < ActiveRecord::Migration[6.0]
  def change
    add_column :workspaces, :discussions_count, :integer, default: 0, null: false
    add_column :discussions, :messages_count, :integer, default: 0, null: false
  end
end
