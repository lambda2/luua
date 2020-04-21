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

class Organization < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  include Trackable
  track!

  validates :name, uniqueness: true

  enum organization_type: %i[company individual association ngo]

  belongs_to :region, optional: true
  belongs_to :country, optional: true

  has_many :workspaces

  has_many :workspace_histories, as: :resource
end
