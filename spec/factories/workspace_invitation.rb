FactoryBot.define do
  factory :workspace_invitation, class: WorkspaceInvitation do
    workspace

    sequence(:email) {|n| Faker::Internet.email(name: "email-#{n}") }
    send_email { false }

    trait :for_user do
      user
    end
  end
end
