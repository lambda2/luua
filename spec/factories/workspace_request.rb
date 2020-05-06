FactoryBot.define do
  factory :workspace_request, class: WorkspaceRequest do
    workspace
    user
  end
end
