# == Schema Information
#
# Table name: missions
#
#  id                  :bigint           not null, primary key
#  banner_image        :string
#  begin_at            :datetime
#  created_by          :integer
#  description         :text
#  due_at              :datetime
#  end_at              :datetime
#  image               :string
#  modified_at         :datetime         not null
#  modified_by         :integer
#  name                :string           not null
#  physical            :boolean          default(FALSE), not null
#  slug                :string           not null
#  visibility          :integer          default("draft"), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  mission_category_id :bigint
#  organization_id     :bigint
#  workspace_id        :bigint
#
# Indexes
#
#  index_missions_on_mission_category_id  (mission_category_id)
#  index_missions_on_organization_id      (organization_id)
#  index_missions_on_workspace_id         (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (mission_category_id => mission_categories.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

# typed: false
FactoryBot.define do

  factory :mission, class: Mission do
    sequence(:name) {|n| "Mission #{Faker::Space.launch_vehicle}-#{n}" }
    description { Faker::Lorem.sentences.join("\n") }
    workspace

  end
end
