class CreateDiscussionCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :discussion_categories do |t|
      t.references :workspace, null: false, foreign_key: true
      t.string :name, null: false
      t.string :slug, null: false
      t.string :icon
      t.string :color
      t.integer :category, null: false, default: 0

      t.timestamps
    end
  end
end
