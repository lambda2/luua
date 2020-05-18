
FactoryBot.define do

  factory :poll_option, class: PollOption do
    sequence(:name) {|n| "PollOption #{Faker::Space.launch_vehicle}-#{n}" }
    poll
  end
end
