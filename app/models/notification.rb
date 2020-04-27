# == Schema Information
#
# Table name: notifications
#
#  id            :bigint           not null, primary key
#  code          :integer
#  content       :string
#  link          :string
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

  scope :unread, -> { where(viewed_at: nil) }
  scope :read, -> { where.not(viewed_at: nil) }

  enum code: {
    'mission.candidate.applied' => 0,     # A candidate applied
    'mission.candidate.rejected' => 1,    # A candidate has been rejected on a mission
    'mission.candidate.canceled' => 2,    # A candidate has canceled a mission
    'mission.candidate.accepted' => 3,    # A candidate has been accepted on a mission
    'mission.candidate.completed' => 4,   # A candidate has completed a mission
    'mission.candidate.reviewed' => 5,    # A candidate has been reviewed on a mission
    'custom' => 100                       # A candidate has been reviewed on a mission
  }, _suffix: true

  def set_default_values
    self.code ||= 'custom'
  end

  def read!
    update(viewed_at: Time.zone.now)
  end
end
