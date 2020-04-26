# == Schema Information
#
# Table name: notifications
#
#  id            :bigint           not null, primary key
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

  scope :unread, -> { where(viewed_at: nil) }
  scope :read, -> { where.not(viewed_at: nil) }

  def read!
    update(viewed_at: Time.zone.now)
  end
end
