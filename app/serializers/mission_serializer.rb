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
#  hiring_validation   :integer          default("review"), not null
#  image               :string
#  modified_at         :datetime         not null
#  modified_by         :integer
#  name                :string           not null
#  participant_count   :integer
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


class MissionSerializer < Panko::Serializer
  attributes :id, :name, :mission_category_id, :physical, :description,
             :begin_at, :end_at, :due_at, :organization_id, :workspace_id,
             :image, :banner_image, :modified_at, :modified_by, :slug,
             :participant_count, :hiring_validation

  has_one :mission_category, serializer: MissionCategoryLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer
  has_one :organization, serializer: OrganizationLightSerializer
  has_many :mission_skills, serializer: MissionSkillSerializer
  has_many :mission_users, serializer: MissionUserSerializer

end
