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
class WorkspaceUserSerializer < Panko::Serializer
  attributes :id, :workspace_id, :user_id, :admin, :role,
             :image_url, :thumb_url, :first_name, :last_name,
             :username, :created_at

  has_one :workspace, serializer: WorkspaceLightSerializer

  def first_name
    object.user.first_name
  end

  def last_name
    object.user.last_name
  end

  def username
    object.user.username
  end

  def image_url
    object.user.image_url
  end

  def thumb_url
    object.user.image&.thumb&.url
  end
end
