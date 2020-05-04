class CreateDiscussions < ActiveRecord::Migration[6.0]
  def change
    create_table :discussions do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.integer :visibility, null: false, default: 0
      t.references :user, null: false, foreign_key: true
      t.references :resource, polymorphic: true, null: false

      t.string :locale, null: false, default: 'en'
      t.integer :messages_count, null: false, default: 0
      t.datetime :locked_at
      t.integer :locked_by
      t.timestamps
    end
  end
end
