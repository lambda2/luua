# typed: false
FactoryBot.define do
  factory :mission_skill, class: MissionSkill do
    mission
    skill
  end
end
