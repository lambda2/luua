class AddLastModToDiscussions < ActiveRecord::Migration[6.0]
  def change
    add_column :discussions, :modified_at, :datetime
    add_column :discussions, :locked_at, :datetime
    add_column :discussions, :locked_by, :integer
  end
end
