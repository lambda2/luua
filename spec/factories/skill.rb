FactoryBot.define do
  factory :skill, class: Skill do
    sequence(:name) {|n| "#{Faker::IndustrySegments.sector}-#{n}" }
    skill_category
  end
end
