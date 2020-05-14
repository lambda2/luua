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

class InvitationValidator < ActiveModel::Validator
  def validate(record)
    record.errors[:email] << 'Please provide an email or a valid username' unless record.email || record.user
  end
end

class WorkspaceInvitation < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :user, optional: true
  belongs_to :workspace, touch: true
  belongs_to :inviter, class_name: 'User'

  has_many :notifications, as: :resource, dependent: :destroy

  enum status: %i[pending accepted rejected], _suffix: true

  validates_with InvitationValidator
  validates :user_id, uniqueness: { scope: :workspace_id, message: 'Is already invited' }
  validates :email, presence: true
  validates :email, uniqueness: { scope: :workspace_id }

  before_validation :infer_email_or_user

  def infer_email_or_user
    self.email ||= user&.email
    self.user ||= User.find_by(email: self.email)
  end

end
