# == Schema Information
#
# Table name: workspaces
#
#  id              :bigint           not null, primary key
#  description     :text
#  image           :string
#  membership      :integer          default("closed"), not null
#  missions_count  :integer          default(0), not null
#  name            :string           not null
#  slug            :string           not null
#  users_count     :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint
#
# Indexes
#
#  index_workspaces_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#

class WorkspaceSerializer < Panko::Serializer
  attributes :id, :name, :slug, :image_url, :thumb_url,
             :users_count, :missions_count, :created_at, :updated_at,
             :description, :membership

  has_one :organization, serializer: OrganizationLightSerializer

  # has_many :missions, serializer: MissionLightSerializer
  has_many :mission_users, serializer: MissionUserLightSerializer
  has_many :workspace_users, serializer: WorkspaceUserSerializer

  def image_url
    object.image_url
  end

  def thumb_url
    object&.image&.thumb&.url
  end
end
