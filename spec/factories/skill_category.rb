FactoryBot.define do
  factory :skill_category, class: SkillCategory do
    sequence(:name) {|n| "#{Faker::IndustrySegments.sector}-#{n}" }

  end
end
