FactoryBot.define do
  factory :workspace_user, class: WorkspaceUser do
    workspace
    user
  end
end
