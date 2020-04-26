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
class CountrySerializer < Panko::Serializer
  attributes :id, :name
end
