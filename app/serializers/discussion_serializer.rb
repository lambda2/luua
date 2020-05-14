# == Schema Information
#
# Table name: discussions
#
#  id             :bigint           not null, primary key
#  messages_count :integer          default(0), not null
#  name           :string           not null
#  resource_type  :string           not null
#  slug           :string           not null
#  visibility     :integer          default(0), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  resource_id    :bigint           not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_discussions_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_discussions_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class DiscussionSerializer < Panko::Serializer
  attributes :id, :name, :slug, :description, :visibility, :user_id,
             :resource_type, :resource_id, :created_at, :updated_at,
             :workspace_id, :messages_count

  def workspace_id
    object.workspace.id
  end

  has_one :user, serializer: UserLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer
  has_many :messages, serializer: MessageSerializer
  has_many :participants, serializer: UserLightSerializer

end
