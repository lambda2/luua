class UserDetailsSerializer < Panko::Serializer
  attributes :id, :email, :image_url, :thumb_url, :username,
             :image, :first_name, :last_name,
             :country_id, :timezone, :created_at, :updated_at

  has_one :primary_workspace, serializer: WorkspaceLightSerializer
  has_many :workspaces, serializer: WorkspaceLightSerializer
  has_many :user_skills, serializer: UserSkillLightSerializer
  has_many :mission_users, serializer: MissionUserLightSerializer

  # def default_workspace
  #   object.workspaces.first&.as_json
  # end

  # def workspaces
  #   object.workspaces.map(&:as_json)
  # end

  def image_url
    object.image_url
  end

  def thumb_url
    object&.image&.thumb&.url
  end
end
