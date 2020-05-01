
class WorkspaceRequestSerializer < Panko::Serializer
  attributes :id, :status, :user_id, :workspace_id, :created_at, :updated_at

  has_one :user, serializer: UserLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer

end
