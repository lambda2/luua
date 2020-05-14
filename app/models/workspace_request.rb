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
  include AASM

  belongs_to :user
  belongs_to :workspace, touch: true
  has_many :notifications, as: :resource, dependent: :destroy

  enum status: %i[pending accepted rejected], _suffix: true

  aasm column: :status, enum: true, logger: Rails.logger do
    state :pending, initial: true
    state :accepted, :rejected

    event :accept do

      # We add the member to the workspace users
      before do
        WorkspaceUser.create!(
          user: user,
          workspace: workspace
        )
      end

      transitions from: :pending, to: :accepted
    end

    event :reject do
      transitions from: %i[pending], to: :rejected
    end
    after_all_transitions :log_status_change

  end

  def log_status_change
    puts "changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end
end
