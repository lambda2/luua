class OrganizationLightSerializer < Panko::Serializer
  attributes :id, :name, :description, :slug, :image, :color,
             :region_id, :country_id, :organization_type,
             :created_at, :updated_at, :modified_at, :visibility

end
