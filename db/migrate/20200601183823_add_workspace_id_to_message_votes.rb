class AddWorkspaceIdToMessageVotes < ActiveRecord::Migration[6.0]
  def change
    add_reference :message_votes, :workspace, foreign_key: true
  end
end
