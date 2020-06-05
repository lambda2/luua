# == Schema Information
#
# Table name: notifications
#
#  id            :bigint           not null, primary key
#  code          :integer
#  content       :string
#  link          :string
#  mailed_at     :datetime
#  resource_type :string
#  title         :string
#  viewed_at     :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint
#  user_id       :bigint           not null
#
# Indexes
#
#  index_notifications_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_notifications_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :resource, polymorphic: true, optional: true

  before_create :set_default_values
  after_create :schedule_notification_summary_email

  validates :resource, presence: true, allow_blank: true
  validates :user, presence: true

  scope :unread, -> { where(viewed_at: nil) }
  scope :read, -> { where.not(viewed_at: nil) }

  enum code: {
    'mission.candidate.applied' => 0,       # A candidate applied
    'mission.candidate.rejected' => 1,      # A candidate has been rejected on a mission
    'mission.candidate.canceled' => 2,      # A candidate has canceled a mission
    'mission.candidate.accepted' => 3,      # A candidate has been accepted on a mission
    'mission.candidate.completed' => 4,     # A candidate has completed a mission
    'mission.candidate.reviewed' => 5,      # A candidate has been reviewed on a mission
    'workspace.invitation.created' => 6,    # An user has been invited to join a workspace
    'workspace.invitation.accepted' => 7,   # An user accepted to join a workspace
    'workspace.invitation.rejected' => 8,   # An user rejected to join a workspace
    'workspace.invitation._accepted' => 9,  # Placeholder for the user who accepted to join a workspace
    'workspace.invitation._rejected' => 10, # Placeholder for the user who rejected to join a workspace
    'workspace.member.joined' => 11,        # A user joined a workspace
    'workspace.request.created' => 12,      # A user asked to join a workspace
    'workspace.request.accepted' => 13,     # A user request to join a workspace has been accepted
    'workspace.request.rejected' => 14,     # A user request to join a workspace has been rejected
    'workspace.request._accepted' => 15,    # Placeholder for a user request to join a workspace has been accepted
    'workspace.request._rejected' => 16,    # Placeholder for a user request to join a workspace has been rejected
    'workspace.discussion.created' => 17,   # A user posted a discussion
    'discussion.message.created' => 18,     # A user posted a message
    'message.mention.created' => 19,        # A user has been mentioned in a message
    'custom' => 100                         # A custom message
  }, _suffix: true

  def set_default_values
    self.code ||= 'custom'
  end

  def read!
    update(viewed_at: Time.zone.now)
  end

  def schedule_notification_summary_email
    # We dont send anything if the user turned off notification mails
    return unless user.email_notifications?

    # We shedule the start and the end of the mission
    Notifications::SendMailForUserWorker.schedule_for_user(user_id)
  end
end
