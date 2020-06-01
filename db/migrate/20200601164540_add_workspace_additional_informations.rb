class AddWorkspaceAdditionalInformations < ActiveRecord::Migration[6.0]
  def change
    add_column :workspaces, :website, :string
    add_reference :workspaces, :region, foreign_key: true, null: true
    add_reference :workspaces, :country, foreign_key: true, null: true
  end
end

