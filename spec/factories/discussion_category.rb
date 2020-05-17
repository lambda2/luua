FactoryBot.define do
  factory :discussion_category, class: DiscussionCategory do
    sequence(:name) {|n| "#{Faker::IndustrySegments.sector}-#{n}" }
    workspace
  end
end
