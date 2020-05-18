class CreateUserVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :user_votes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :poll, null: false, foreign_key: true
      t.references :poll_option, null: true, foreign_key: true
      t.timestamps
    end

    add_index :user_votes, %i[user_id poll_id], unique: true
  end
end
