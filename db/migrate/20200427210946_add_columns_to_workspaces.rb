class AddColumnsToWorkspaces < ActiveRecord::Migration[6.0]
  def change
    add_column :workspaces, :description, :text

    # How can an user join a workspace ? Is it open, or requires approval ? Or private ?
    add_column :workspaces, :membership, :integer, null: false, default: 0
  end
end
