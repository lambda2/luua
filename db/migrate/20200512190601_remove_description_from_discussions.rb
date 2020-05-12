class RemoveDescriptionFromDiscussions < ActiveRecord::Migration[6.0]
  def change
    remove_column :discussions, :description
    add_column :messages, :root, :boolean, default: false, null: false
  end
end
