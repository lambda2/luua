# == Schema Information
#
# Table name: workspaces
#
#  id                :bigint           not null, primary key
#  description       :text
#  discussions_count :integer          default(0), not null
#  image             :string
#  membership        :integer          default("closed"), not null
#  missions_count    :integer          default(0), not null
#  name              :string           not null
#  polls_count       :integer          default(0), not null
#  slug              :string           not null
#  users_count       :integer          default(0), not null
#  website           :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  country_id        :bigint
#  organization_id   :bigint
#  region_id         :bigint
#
# Indexes
#
#  index_workspaces_on_country_id       (country_id)
#  index_workspaces_on_organization_id  (organization_id)
#  index_workspaces_on_region_id        (region_id)
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (region_id => regions.id)
#

class WorkspaceSerializer < Panko::Serializer
  attributes :id, :name, :slug, :image_url, :thumb_url,
             :users_count, :missions_count, :discussions_count, :polls_count,
             :created_at, :updated_at, :description, :membership,
             :website, :region_id, :country_id

  has_one :organization, serializer: OrganizationLightSerializer
  has_one :region, serializer: RegionSerializer
  has_one :country, serializer: CountrySerializer

  # has_many :missions, serializer: MissionLightSerializer
  # has_many :discussions, serializer: DiscussionLightSerializer
  has_many :mission_users, serializer: MissionUserLightSerializer
  has_many :workspace_users, serializer: WorkspaceUserSerializer
  has_many :discussion_categories, serializer: DiscussionCategorySerializer

  def image_url
    object.image_url
  end

  def thumb_url
    object&.image&.thumb&.url
  end

  def discussions_count
    object.discussions.count
  end
end
