# == Schema Information
#
# Table name: workspace_requests
#
#  id           :bigint           not null, primary key
#  status       :integer          default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint
#  workspace_id :bigint
#
# Indexes
#
#  index_workspace_requests_on_user_id       (user_id)
#  index_workspace_requests_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
class WorkspaceRequest < ApplicationRecord
  belongs_to :user
  belongs_to :workspace

  enum status: %i[pending accepted rejected], _suffix: true

end
