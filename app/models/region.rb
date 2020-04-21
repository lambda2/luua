# == Schema Information
#
# Table name: regions
#
#  id         :bigint           not null, primary key
#  icon       :string
#  name       :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_regions_on_name  (name) UNIQUE
#  index_regions_on_slug  (slug) UNIQUE
#

class Region < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

end
