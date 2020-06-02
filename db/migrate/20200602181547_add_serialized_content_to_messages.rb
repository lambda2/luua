class AddSerializedContentToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :serialized_content, :text
  end
end
