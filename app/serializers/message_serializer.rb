# typed: true
class MessageSerializer < Panko::Serializer
  attributes :id, :ticket_id, :content, :user_id, :user_info_id, :message_type,
             :created_at, :updated_at, :author

  has_one :user, serializer: GenericUserSerializer
  has_one :user_info, serializer: GenericUserSerializer

  def author
    GenericUserSerializer.new.serialize(object.user || object.user_info)
  end
end
