# == Schema Information
#
# Table name: skills
#
#  id                :bigint           not null, primary key
#  color             :string
#  description       :text
#  full_name         :string
#  icon              :string
#  level             :integer          not null
#  name              :string
#  popularity        :integer          default(0), not null
#  skill_type        :integer
#  slug              :string
#  tags              :text             default(""), not null
#  visible           :boolean          default(FALSE), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  organization_id   :bigint
#  parent_id         :integer
#  skill_category_id :bigint           not null
#
# Indexes
#
#  index_skills_on_organization_id    (organization_id)
#  index_skills_on_parent_id          (parent_id)
#  index_skills_on_skill_category_id  (skill_category_id)
#  index_skills_on_slug               (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (parent_id => skills.id)
#  fk_rails_...  (skill_category_id => skill_categories.id)
#

class Skill < ApplicationRecord
  extend FriendlyId
  friendly_id :name_en, use: :slugged

  translates :name, fallbacks_for_empty_translations: true, touch: true
  translates :full_name, fallbacks_for_empty_translations: true, touch: true
  translates :description, fallbacks_for_empty_translations: true, touch: true
  globalize_accessors locales: %i[en fr], attributes: %i[name full_name description]

  enum skill_type: %i[global organization]

  belongs_to :skill_category, optional: true
  belongs_to :organization, optional: true

  has_many :user_skills, dependent: :destroy
  has_many :users, through: :user_skills

  belongs_to :parent, optional: true, class_name: 'Skill'
  has_many :children, class_name: 'Skill', foreign_key: 'parent_id', dependent: :destroy

  before_validation :set_default_values
  # before_validation :compute_users_count, on: :update

  # validates :name, uniqueness: true,
  #  presence: true

  scope :root_level, -> { where(parent_id: nil) }
  scope :search, ->(q) { joins(:translations).where('LOWER(unaccent(skill_translations.full_name)) ILIKE LOWER(unaccent(?)) OR LOWER(unaccent(tags)) ILIKE LOWER(unaccent(?))', "%#{q}%", "%#{q}%") }
  scope :exact_search, ->(q) { joins(:translations).where('LOWER(unaccent(skill_translations.name)) ILIKE LOWER(unaccent(?))', q.to_s) }

  def cache_key
    super + '-' + Globalize.locale.to_s
  end

  def set_default_values
    self.skill_category ||= SkillCategory.where(name: 'General').first_or_create!
    self.skill_type ||= :global if organization_id.nil?
    self.level = parent_ids.count
    self.full_name = to_desc
  end

  def touch_parents
    parents.map(&:touch)
  end

  def to_desc
    [parent&.to_desc, name].compact.join(' > ')
  end

  def to_hierarchy
    [*parent&.to_hierarchy, self].compact
  end

  def parent_ids
    [*parent&.parent_ids, parent_id].compact
  end

  def parents
    [*parent&.parents, parent].compact
  end

  def descendents
    self_and_descendents - [self]
  end

  def self_and_descendents
    self.class.tree_for(self)
  end

  def descendent_skills
    subtree = self.class.tree_sql_for(self)
    Skill.where("parent_id IN (#{subtree})")
  end

  def direct_descendent_skills
    Skill.where(parent_id: id)
  end

  def brother_skills
    Skill.where(parent_id: parent_id)
  end

  # Will query all the users linked to this skill
  # and adjust his counter accordingly
  # @TODO maybe later, useless now
  # def compute_users_count
  #   count = ActiveRecord::Base.connection.execute(<<-SQL
  #     SELECT COUNT(DISTINCT user_skills.user_id) as count
  #     FROM user_skills
  #     INNER JOIN users ON users.id = user_skills.user_id
  #     WHERE user_skills.skill_id IN (#{[id, *descendent_skills.pluck(:id)].compact.join(',')})
  #     ;
  #   SQL
  #                                                )
  #   self.users_count = (count&.values&.first&.first || 0)
  # end

  def self.tree_for(instance)
    where("#{table_name}.id IN (#{tree_sql_for(instance)})").order("#{table_name}.id")
  end

  def self.skill_ids_for_slug(slug)
    where("#{table_name}.id IN (#{ids_for_slug_sql_for(slug)})").order("#{table_name}.id")
  end

  def self.tree_sql_for(instance)
    _tree_sql = <<-SQL
      WITH RECURSIVE search_tree(id, path) AS (
          SELECT id, ARRAY[id]
          FROM #{table_name}
          WHERE id = #{instance.id}
        UNION ALL
          SELECT #{table_name}.id, path || #{table_name}.id
          FROM search_tree
          JOIN #{table_name} ON #{table_name}.parent_id = search_tree.id
          WHERE NOT #{table_name}.id = ANY(path)
      )
      SELECT id FROM search_tree ORDER BY path
    SQL
  end

  def self.ids_for_slug_sql_for(slug)
    tree_sql = <<-SQL
      WITH RECURSIVE search_tree(id, path) AS (
          SELECT id, ARRAY[id]
          FROM #{table_name}
          WHERE slug LIKE ?
        UNION ALL
          SELECT #{table_name}.id, path || #{table_name}.id
          FROM search_tree
          JOIN #{table_name} ON #{table_name}.parent_id = search_tree.id
          WHERE NOT #{table_name}.id = ANY(path)
      )
      SELECT id FROM search_tree ORDER BY path
    SQL
    ActiveRecord::Base.send(:sanitize_sql_array, [tree_sql, slug])
  end
end
