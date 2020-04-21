# == Schema Information
#
# Table name: mission_categories
#
#  id          :bigint           not null, primary key
#  color       :string
#  description :text
#  icon        :string
#  name        :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_mission_categories_on_name  (name) UNIQUE
#  index_mission_categories_on_slug  (slug) UNIQUE
#

class MissionCategory < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

end
