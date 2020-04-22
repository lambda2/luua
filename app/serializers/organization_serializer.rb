# == Schema Information
#
# Table name: organizations
#
#  id                :bigint           not null, primary key
#  color             :string
#  description       :text
#  image             :string
#  modified_at       :datetime         not null
#  modified_by       :integer
#  name              :string
#  organization_type :integer
#  slug              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  country_id        :bigint
#  region_id         :bigint           not null
#
# Indexes
#
#  index_organizations_on_country_id  (country_id)
#  index_organizations_on_name        (name) UNIQUE
#  index_organizations_on_region_id   (region_id)
#  index_organizations_on_slug        (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (region_id => regions.id)
#


class OrganizationSerializer < Panko::Serializer
  attributes :id, :name, :description, :slug, :image, :color,
             :region_id, :country_id, :organization_type,
             :created_at, :updated_at, :modified_at, :visibility

end
