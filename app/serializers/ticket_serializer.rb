# typed: strict
class TicketSerializer < Panko::Serializer
  attributes :id, :title, :description_md, :description_html, :workspace_id,
             :owner_id, :operator_id, :state, :author_type, :author_id, :origin_id,
             :parent_id, :position, :modified_at, :created_at, :updated_at, :messages_count

  has_one :author, serializer: GenericUserSerializer
  has_one :owner, serializer: GenericUserSerializer
  has_one :operator, serializer: UserSerializer

end
