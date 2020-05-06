class DiscussionSerializer < Panko::Serializer
  attributes :id, :name, :slug, :description, :visibility, :user_id,
             :resource_type, :resource_id, :created_at, :updated_at,
             :workspace_id

  def workspace_id
    object.workspace.id
  end

  has_one :user, serializer: UserLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer
  has_many :messages, serializer: MessageSerializer

end
