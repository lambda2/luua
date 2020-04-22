class GenericUserSerializer < Panko::Serializer
  attributes :id, :email, :image, :first_name, :last_name,
             :country_id, :timezone, :created_at, :updated_at,
             :class_type, :image_url, :thumb_url

  def class_type
    object.class.to_s.underscore
  end

  def image_url
    object.image_url
  end

  def thumb_url
    object&.image&.thumb&.url
  end
end
