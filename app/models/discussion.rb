# == Schema Information
#
# Table name: discussions
#
#  id                     :bigint           not null, primary key
#  locked_at              :datetime
#  locked_by              :integer
#  messages_count         :integer          default(0), not null
#  modified_at            :datetime
#  name                   :string           not null
#  resource_type          :string           not null
#  slug                   :string           not null
#  visibility             :integer          default("public"), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  discussion_category_id :bigint
#  resource_id            :bigint           not null
#  user_id                :bigint           not null
#
# Indexes
#
#  index_discussions_on_discussion_category_id         (discussion_category_id)
#  index_discussions_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_discussions_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_category_id => discussion_categories.id)
#  fk_rails_...  (user_id => users.id)
#
class Discussion < ApplicationRecord

  attr_accessor :description

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user
  belongs_to :discussion_category, optional: true
  belongs_to :resource, polymorphic: true, optional: true, touch: true

  has_many :messages, dependent: :destroy
  has_many :discussion_readings, dependent: :destroy
  has_many :participants, -> { distinct }, through: :messages, source: :user
  has_many :message_votes, through: :messages

  has_many :notifications, as: :resource, dependent: :destroy

  has_many :polls, dependent: :nullify

  after_create :create_root_message!

  scope :available_for, ->(user_id) { visible_for(user_id).distinct }
  scope :unread, ->(user_id) { unread_for(user_id).distinct }

  # @TODO discussion visibilities
  #
  # - protected: Discussion is only visible for workspace members
  # - public: Discussion is visible to everyone
  enum visibility: %i[public protected], _suffix: true

  def self.visible_for(user_id)
    return where(visibility: :public) unless user_id

    disc = <<-SQL
        discussions.visibility = #{Discussion.visibilities[:public]} OR
        (
          discussions.visibility IN (#{Discussion.visibilities[:protected]}) AND
          discussions.user_id = #{user_id}
        ) OR
        ("workspace_users"."user_id" = #{user_id} AND visibility = #{Discussion.visibilities[:protected]})
    SQL

    where(resource_type: 'workspace').joins('INNER JOIN workspace_users ON workspace_users.workspace_id = discussions.resource_id').where(disc)
  end

  # @TODO risky, as this can fail in many ways...
  def create_root_message!
    return if description.blank?

    Message.create!(
      content: description,
      root: true,
      user: user,
      discussion_id: id
    )
  end

  def self.unread_for(user_id)
    return all unless user_id

    disc = <<-SQL
        discussions.modified_at > discussion_readings.updated_at OR
        discussion_readings.id IS NULL
    SQL

    joins('LEFT JOIN discussion_readings ON discussion_readings.discussion_id = discussions.id').where(disc)
  end

  def lock!
    update(locked_at: Time.zone.now, locked_by: Current.user&.id)
  end

  def locked?
    !locked_at.nil?
  end

  # People to notify when new messages are published.
  # @TODO create subscriptions later ?
  def subscriber_ids
    participant_ids
  end

  def workspace
    case resource_type
    when 'Workspace'
      resource
    when 'Mission'
      resource.workspace
    end
  end
end
