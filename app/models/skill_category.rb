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

class SkillCategory < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :skills
end
