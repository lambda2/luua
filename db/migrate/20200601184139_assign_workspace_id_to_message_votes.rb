class AssignWorkspaceIdToMessageVotes < ActiveRecord::Migration[6.0]
  def change
    MessageVote.all.map do |mv|
      mv.set_workspace_id
      mv.save
    end
  end
end
