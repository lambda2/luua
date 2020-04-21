# == Schema Information
#
# Table name: workspaces_users
#
#  id           :bigint           not null, primary key
#  admin        :boolean          default(FALSE), not null
#  role         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_workspaces_users_on_user_id       (user_id)
#  index_workspaces_users_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

class WorkspacesUser < ApplicationRecord

  belongs_to :user
  belongs_to :workspace, counter_cache: :users_count

  before_create :set_admin_on_first_user
  after_create :set_primary_workspace_for_user

  def set_admin_on_first_user
    return unless admin || workspace.workspaces_users.count > 1

    self.admin ||= true
  end

  def set_primary_workspace_for_user
    return unless user

    user.update(primary_workspace_id: workspace_id)
  end
end
