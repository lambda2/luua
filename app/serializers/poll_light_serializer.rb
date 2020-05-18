class PollLightSerializer < Panko::Serializer
  attributes :id, :anonymity, :authentication,
             :begin_at, :category, :description, :end_at,
             :locked_at, :locked_by, :name, :poll_type, :slug,
             :visibility, :created_at, :updated_at, :discussion_category_id,
             :discussion_id, :user_id, :workspace_id

  has_one :workspace, serializer: WorkspaceLightSerializer

end
