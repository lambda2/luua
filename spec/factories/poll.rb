FactoryBot.define do

  factory :poll, class: Poll do
    sequence(:name) {|n| "Poll #{Faker::Space.launch_vehicle}-#{n}" }
    description { Faker::Lorem.sentences.join("\n") }
    user
    workspace { create(:workspace, user_ids: [user.id]) }
    discussion { create(:discussion, resource: workspace) }
    poll_options do
      build_list(:poll_option, 3, poll: nil)
    end
  end
end
