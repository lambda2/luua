class AddRootMessage < ActiveRecord::Migration[6.0]
  def change
    add_reference :discussions, :root_message, foreign_key: { to_table: :messages }
    add_column :messages, :message_type, :integer, null: false, default: 0
  end
end
