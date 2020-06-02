class AddCategoryCounters < ActiveRecord::Migration[6.0]
  def change
    add_column :discussion_categories, :discussions_count, :integer, null: false, default: 0
  end
end
