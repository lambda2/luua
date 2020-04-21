# typed: false
FactoryBot.define do
  factory :organization, class: Organization do
    sequence(:name) {|n| "org #{Faker::Movies::StarWars.planet}-#{n}" }
    description { Faker::Lorem.sentences.join("\n") }
    country { [Country.all.sample, nil].sample }
    region { country&.region || Region.all.sample }
    # remote_image_url { Faker::LoremFlickr.image }
    # workspace_type { 'company' }
  end
end
