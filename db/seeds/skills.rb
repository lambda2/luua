# Our main category
SkillCategory.where(name: 'General').first_or_create!

def save_skill(skill, cat, parent = nil)
  puts "🎒 Adding skill #{parent ? "#{parent.full_name} > " : ''}#{skill['name']}"

  s = Skill.where(
    name: skill['name'] || skill['name'], parent: parent
  ).first_or_create!
  s.update(
    visible: true,
    skill_category_id: cat.id,
    popularity: skill['popularity']&.to_i || 0
  )

  s.name_fr = skill['name_fr'] if skill['name_fr']
  s.description_fr = skill['description_fr'] if skill['description_fr']
  s.description_en = skill['description_en'] || skill['description'] if (skill['description_en'] || skill['description'])

  s.save

  skill['children']&.map {|p| save_skill(p, cat, s) }
  s
end

categories = [
  { name: 'Language' },
  { name: 'Mobility' },
  { name: 'Technical' }
]

skill_data = {
  language: JSON.parse(File.read("#{Rails.root}/db/seeds/dumps/language.json")),
  mobility: JSON.parse(File.read("#{Rails.root}/db/seeds/dumps/mobility.json")),
  technical: JSON.parse(File.read("#{Rails.root}/db/seeds/dumps/technical.json"))
}

return if ENV['LIGHT_SEED']

categories.map do |cat|
  sc = SkillCategory.where(cat).first_or_create!
  skills = skill_data[sc.slug.to_sym]

  if sc.slug == 'technical' && Rails.env.test?
    save_skill(skills.first, sc, nil)
  else
    skills.map {|p| save_skill(p, sc, nil) }
  end
end
