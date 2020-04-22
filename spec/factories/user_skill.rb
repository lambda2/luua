# typed: false
FactoryBot.define do
  factory :user_skill, class: UserSkill do
    user
    skill
  end
end
