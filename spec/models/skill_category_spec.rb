# == Schema Information
#
# Table name: skill_categories
#
#  id         :bigint           not null, primary key
#  color      :string
#  icon       :string
#  name       :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_skill_categories_on_name  (name) UNIQUE
#  index_skill_categories_on_slug  (slug) UNIQUE
#

require 'rails_helper'

RSpec.describe SkillCategory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
