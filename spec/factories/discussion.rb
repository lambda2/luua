
FactoryBot.define do

  factory :discussion, class: Discussion do
    sequence(:name) {|n| "Discussion #{Faker::Space.launch_vehicle}-#{n}" }
    description { Faker::Lorem.sentences.join("\n") }
    association :resource, factory: :workspace
    user
  end
end
