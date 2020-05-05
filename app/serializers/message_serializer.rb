
class MessageSerializer < Panko::Serializer
  attributes :id, :content, :parent_id, :user_id, :discussion_id,
             :created_at, :updated_at

  has_one :user, serializer: UserLightSerializer
  has_one :parent, serializer: MessageSerializer

end
