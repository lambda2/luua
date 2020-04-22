
class UserSkillLightSerializer < Panko::Serializer
  attributes :id, :level, :type, :name, :slug, :skill_id, :category

  def type
    object.skill.skill_type
  end

  def category
    object.skill&.skill_category&.slug
  end

  def name
    object.skill.name
  end

  def slug
    object.skill.slug
  end
end
