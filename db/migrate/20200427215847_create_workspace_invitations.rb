class CreateWorkspaceInvitations < ActiveRecord::Migration[6.0]
  def change
    # Invite an user to a workspace
    create_table :workspace_invitations do |t|
      t.references :workspace, null: true, foreign_key: true
      t.references :user, null: true, foreign_key: true
      t.string :email, null: true
      t.boolean :send_email, null: false, default: false
      t.references :inviter, foreign_key: { to_table: :users }, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
