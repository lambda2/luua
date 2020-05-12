class CreateMessageVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :message_votes do |t|
      t.integer :vote, null: false, default: 0
      t.references :user, null: false, foreign_key: true
      t.references :message, null: false, foreign_key: true

      t.timestamps
    end

    add_index :message_votes, %i[user_id message_id], unique: true

    add_column :messages, :positive_vote_count, :integer, default: 0, null: false
    add_column :messages, :negative_vote_count, :integer, default: 0, null: false
  end
end
