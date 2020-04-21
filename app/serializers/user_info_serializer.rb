# typed: strict
class UserInfoSerializer < Panko::Serializer
  attributes :id, :workspace_id, :email, :first_name, :last_name, :company,
             :description, :website, :phone, :image, :country, :timezone,
             :created_at, :updated_at
end
