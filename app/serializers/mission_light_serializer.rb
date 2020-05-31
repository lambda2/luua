class MissionLightSerializer < Panko::Serializer
  attributes :id, :name, :mission_category_id, :physical, :description,
             :begin_at, :end_at, :due_at, :organization_id, :discussion_id,
             :workspace_id,
             :image, :banner_image, :modified_at, :modified_by, :slug,
             :visibility, :skills, :participant_count, :accepted_count

  has_one :mission_category, serializer: MissionCategoryLightSerializer
  has_one :workspace, serializer: WorkspaceLightSerializer
  has_one :organization, serializer: OrganizationLightSerializer
  has_one :discussion, serializer: DiscussionLightSerializer

  def skills
    object.skills.map(&:name)
  end

  # @TODO this column could be cached in the missions table ?
  def accepted_count
    object.mission_users.contributors.count
  end
end
