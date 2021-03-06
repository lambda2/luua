class DiscussionLightSerializer < Panko::Serializer
  attributes :id, :name, :slug, :description, :visibility, :user_id,
             :resource_type, :resource_id, :created_at, :updated_at,
             :workspace_id, :messages_count, :modified_at, :locked_at, :locked_by

  has_one :user, serializer: UserLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer
  has_one :discussion_category, serializer: DiscussionCategorySerializer
  has_one :root_message, serializer: MessageSerializer

  has_many :participants, serializer: UserLightSerializer
  has_many :polls, serializer: PollLightSerializer
  has_many :missions, serializer: MissionLightSerializer

  def workspace_id
    object.workspace.id
  end
end
