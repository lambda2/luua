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

require 'rails_helper'

RSpec.describe Region, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
