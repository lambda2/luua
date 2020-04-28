# == Schema Information
#
# Table name: workspace_invitations
#
#  id           :bigint           not null, primary key
#  email        :string
#  send_email   :boolean          default(FALSE), not null
#  status       :integer          default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  inviter_id   :bigint           not null
#  user_id      :bigint
#  workspace_id :bigint
#
# Indexes
#
#  index_workspace_invitations_on_inviter_id    (inviter_id)
#  index_workspace_invitations_on_user_id       (user_id)
#  index_workspace_invitations_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (inviter_id => users.id)
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
class WorkspaceInvitation < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :workspace
  belongs_to :inviter, class_name: 'User'

  enum status: %i[pending accepted rejected], _suffix: true

  before_validation :set_email_or_user

  validate :matching_email, on: :create
  validates :send_email, :email, presence: true

  def matching_email
    errors.add(:email, 'Provided email dont match the user email') if user && user.email != email
  end

  def set_email_or_user
    self.email ||= user&.email
    self.user ||= User.find_by(email: self.email)
  end

end
