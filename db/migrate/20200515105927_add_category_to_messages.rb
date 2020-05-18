class AddCategoryToMessages < ActiveRecord::Migration[6.0]
  def change
    add_reference :discussions, :discussion_category, null: true, foreign_key: true
  end
end
