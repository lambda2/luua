class PollLightSerializer < Panko::Serializer
  attributes :id, :anonymity, :authentication,
             :begin_at, :category, :description, :end_at,
             :locked_at, :locked_by, :name, :poll_type, :slug,
             :closed_at, :closed_by,
             :visibility, :created_at, :updated_at, :discussion_category_id,
             :discussion_id, :user_id, :workspace_id, :reveal, :vote_count

  has_one :workspace, serializer: WorkspaceLightSerializer
  has_one :user, serializer: UserLightSerializer
  # has_one :discussion_category, serializer: DiscussionCategorySerializer

end
