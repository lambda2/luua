class CreatePollOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :poll_options do |t|
      t.references :poll, null: false, foreign_key: true
      t.string :name, null: false
      t.string :slug, null: false
      t.string :icon, null: true
      t.text :description, null: true
      t.integer :vote_count, null: false, default: 0
      t.timestamps
    end

    add_index :poll_options, %i[slug poll_id], unique: true
  end
end
