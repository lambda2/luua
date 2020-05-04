# == Schema Information
#
# Table name: workspace_users
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
#  index_workspace_users_on_user_id       (user_id)
#  index_workspace_users_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

class WorkspaceUser < ApplicationRecord

  belongs_to :user
  belongs_to :workspace, counter_cache: :users_count
  has_many :notifications, as: :resource, dependent: :destroy

  before_create :set_admin_on_first_user
  after_create :set_primary_workspace_for_user

  validates :user_id, uniqueness: { scope: :workspace_id }

  def set_admin_on_first_user
    puts "Do we set admin for #{user.email} & worksp #{workspace&.name} ? #{admin.inspect} || #{workspace.workspace_users.where.not(user_id: user_id).empty?.inspect}"
    return unless admin || workspace.workspace_users.where.not(user_id: user_id).empty?

    self.admin = true
  end

  def set_primary_workspace_for_user
    return unless user&.primary_workspace_id

    user.update(primary_workspace_id: workspace_id)
  end
end
