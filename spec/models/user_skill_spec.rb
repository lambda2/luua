# == Schema Information
#
# Table name: user_skills
#
#  id         :bigint           not null, primary key
#  level      :integer          default(1), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  skill_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_skills_on_skill_id  (skill_id)
#  index_user_skills_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill_id => skills.id)
#  fk_rails_...  (user_id => users.id)
#

require 'rails_helper'

RSpec.describe UserSkill, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
