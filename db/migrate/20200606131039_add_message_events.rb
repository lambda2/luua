class AddMessageEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :event_type, :integer, null: true
    add_reference :messages, :resource, polymorphic: true, null: true
  end
end
