class WorkspaceLightSerializer < Panko::Serializer
  attributes :id, :name, :slug, :image_url, :thumb_url,
             :users_count, :missions_count, :created_at, :updated_at,
             :description, :membership

  def image_url
    object.image_url
  end

  def thumb_url
    object&.image&.thumb&.url
  end
end
