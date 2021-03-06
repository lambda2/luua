FactoryBot.define do
  factory :user, class: User do
    sequence(:username) {|n| "#{Faker::Internet.username}-#{n}" }
    email { Faker::Internet.email(name: username) }
    password { Faker::Internet.password }
    password_confirmation { password }

    # remote_image_url { Faker::LoremFlickr.image }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    admin { false }
    # country {}
    # timezone {}

    workspace_ids { [create(:workspace).id] }

    trait :confirmed do
      before(:create, &:confirm)
    end

    factory :admin, class: User do
      sequence(:username) {|n| "#{Faker::Internet.username}-#{n}" }
      email { Faker::Internet.email(name: username) }
      password { Faker::Internet.password }
      password_confirmation { password }

      # remote_image_url { Faker::LoremFlickr.image }
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name }
      admin { true }
    end
  end
end
