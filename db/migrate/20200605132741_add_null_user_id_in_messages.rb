class AddNullUserIdInMessages < ActiveRecord::Migration[6.0]
  def change
    change_column_null :discussions, :user_id, true
    change_column_null :messages, :user_id, true
    change_column_null :message_mentions, :user_id, true
    change_column_null :workspace_histories, :user_id, true
    change_column_null :message_votes, :user_id, true
  end
end
