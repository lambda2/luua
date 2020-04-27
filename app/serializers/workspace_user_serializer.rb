class WorkspaceUserSerializer < Panko::Serializer
  attributes :id, :workspace_id, :user_id, :admin, :role,
             :image_url, :thumb_url, :first_name, :last_name,
             :username, :created_at

  def first_name
    object.user.first_name
  end

  def last_name
    object.user.last_name
  end

  def username
    object.user.username
  end

  def image_url
    object.user.image_url
  end

  def thumb_url
    object.user.image&.thumb&.url
  end
end
