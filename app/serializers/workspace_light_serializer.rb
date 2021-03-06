class WorkspaceLightSerializer < Panko::Serializer
  attributes :id, :name, :slug, :image_url, :thumb_url,
             :users_count, :missions_count, :discussions_count, :polls_count,
             :created_at, :updated_at, :description, :membership,
             :website, :region_id, :country_id

  def image_url
    object.image_url
  end

  def thumb_url
    object&.image&.thumb&.url
  end

  def discussions_count
    object.discussions.count
  end
end
