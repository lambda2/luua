class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :resource, polymorphic: true, null: true
      t.datetime :viewed_at
      t.string :title
      t.string :content
      t.string :link

      t.timestamps
    end
  end
end
