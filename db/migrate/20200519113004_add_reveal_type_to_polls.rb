class AddRevealTypeToPolls < ActiveRecord::Migration[6.0]
  def change
    add_column :polls, :reveal, :integer, default: 0, null: false
    add_column :polls, :vote_count, :integer, default: 0, null: false
    add_column :workspaces, :polls_count, :integer, default: 0, null: false
    rename_column :polls, :locked_at, :closed_at
    rename_column :polls, :locked_by, :closed_by
  end
end
