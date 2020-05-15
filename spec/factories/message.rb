FactoryBot.define do

  factory :message, class: Message do
    content { Faker::Lorem.sentences.join("\n") }
    discussion
    user

  end
end
