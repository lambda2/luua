# typed: false
FactoryBot.define do
  factory :workspace, class: Workspace do
    sequence(:name) {|n| "#{Faker::Space.agency}-#{n}" }
    # remote_image_url { Faker::LoremFlickr.image }
    # workspace_type { 'company' }

    trait :with_admin_user do
      after :create do |ws|
        ws.workspaces_users.last.update(admin: true)
      end
    end
  end
end
