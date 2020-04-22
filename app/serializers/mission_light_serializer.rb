class MissionLightSerializer < Panko::Serializer
  attributes :id, :name, :mission_category_id, :physical, :description,
             :begin_at, :end_at, :due_at, :organization_id, :workspace_id,
             :image, :banner_image, :modified_at, :modified_by, :slug,
             :visibility, :skills, :participant_count

  has_one :mission_category, serializer: MissionCategoryLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer
  has_one :organization, serializer: OrganizationLightSerializer

  def skills
    object.skills.pluck(:name)
  end
end
