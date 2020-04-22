# == Schema Information
#
# Table name: skills
#
#  id                :bigint           not null, primary key
#  color             :string
#  description       :text
#  full_name         :string           not null
#  icon              :string
#  level             :integer          not null
#  name              :string
#  popularity        :integer          default(0), not null
#  skill_type        :integer
#  slug              :string
#  tags              :text             default(""), not null
#  visible           :boolean          default(FALSE), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  organization_id   :bigint
#  parent_id         :integer
#  skill_category_id :bigint           not null
#
# Indexes
#
#  index_skills_on_name               (name) UNIQUE
#  index_skills_on_organization_id    (organization_id)
#  index_skills_on_parent_id          (parent_id)
#  index_skills_on_skill_category_id  (skill_category_id)
#  index_skills_on_slug               (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (parent_id => skills.id)
#  fk_rails_...  (skill_category_id => skill_categories.id)
#

require 'rails_helper'

RSpec.describe Skill, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
