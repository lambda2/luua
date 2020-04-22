# typed: strict
class SkillLightSerializer < Panko::Serializer
  attributes :id, :name, :description, :icon, :color, :slug,
             :parent_id, :skill_category_id, :created_at,
             :updated_at, :organization_id, :skill_type, :level,
             :full_name, :tags, :visible

end
