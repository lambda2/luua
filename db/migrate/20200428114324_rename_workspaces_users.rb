class RenameWorkspacesUsers < ActiveRecord::Migration[6.0]
  def change
    rename_table :workspaces_users, :workspace_users
  end
end
