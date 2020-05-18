class CreatePolls < ActiveRecord::Migration[6.0]
  def change
    create_table :polls do |t|
      t.references :workspace, null: false, foreign_key: true
      t.references :discussion, null: true, foreign_key: true
      t.references :discussion_category, null: true, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.string :name, null: false
      t.text :description, null: false
      t.string :slug, null: false
      
      t.integer :authentication, null: false, default: 0
      t.integer :anonymity, null: false, default: 0
      t.integer :visibility, null: false, default: 0
      t.integer :category, null: false, default: 0
      
      t.integer :poll_type, null: false, default: 0

      t.datetime :begin_at
      t.datetime :end_at

      t.datetime :locked_at
      t.integer :locked_by

      t.timestamps
    end
  end
end
