class CreateWorkspaceRequests < ActiveRecord::Migration[6.0]
  def change
    # Requests from an user to join a workspace
    create_table :workspace_requests do |t|
      t.references :user, null: true, foreign_key: true
      t.references :workspace, null: true, foreign_key: true
      t.integer :status, null: false, default: 0
      t.timestamps
    end
  end
end
