# == Schema Information
#
# Table name: countries
#
#  id         :bigint           not null, primary key
#  alpha2     :string
#  icon       :string
#  name       :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  region_id  :bigint           not null
#
# Indexes
#
#  index_countries_on_alpha2     (alpha2) UNIQUE
#  index_countries_on_name       (name) UNIQUE
#  index_countries_on_region_id  (region_id)
#  index_countries_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (region_id => regions.id)
#

class Country < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :region

  before_validation :set_default_values, on: :create

  def set_default_values
    country = ISO3166::Country.find_country_by_name(name)
    errors.add(:name, "Unknown country: #{name}") unless country

    self.name = country.name
    self.alpha2 = country.alpha2
    self.region = Region.where(name: country.continent).first_or_create
  end
end
