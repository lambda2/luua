# == Schema Information
#
# Table name: workspaces
#
#  id                :bigint           not null, primary key
#  description       :text
#  discussions_count :integer          default(0), not null
#  image             :string
#  membership        :integer          default("closed"), not null
#  missions_count    :integer          default(0), not null
#  name              :string           not null
#  slug              :string           not null
#  users_count       :integer          default(0), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  organization_id   :bigint
#
# Indexes
#
#  index_workspaces_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#

require 'carrierwave/orm/activerecord'

class Workspace < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :organization, optional: true

  # People belonging to the workspace
  has_many :workspace_users, dependent: :destroy

  # discussion in the workspace
  has_many :discussions, as: :resource, dependent: :destroy

  # People invited to join the workspace
  has_many :workspace_invitations, dependent: :destroy

  # People requesting to join the workspace
  has_many :workspace_requests, dependent: :destroy

  # Keep track of events in the workspace
  has_many :workspace_histories, dependent: :destroy

  has_many :notifications, as: :resource, dependent: :destroy

  has_many :users, through: :workspace_users
  has_many :missions, dependent: :destroy

  has_many :mission_users, through: :missions

  has_many :projects, dependent: :destroy
  
  has_many :priorities, dependent: :destroy
  
  has_many :discussion_categories, dependent: :destroy
  
  has_many :polls, dependent: :destroy

  validates :name, uniqueness: true

  after_create :create_default_priorities!
  after_create :create_default_discussion_categories!
  before_validation :generate_slug
  before_destroy :roll_default_workspaces

  mount_base64_uploader :image, AvatarUploader

  enum membership: {
    closed: 0,        # Invitation only
    approval: 1,      # Requires approval
    open: 2           # Everybody can join
  }, _suffix: true

  def admin_ids
    workspace_users.where(admin: true).pluck(:user_id)
  end

  def generate_slug
    self.slug = name.parameterize
  end

  def create_default_priorities!
    return unless priorities.empty?

    Priority.defaults!(id)
  end

  def create_default_discussion_categories!
    return unless discussion_categories.empty?

    DiscussionCategory.defaults!(id)
  end

  def roll_default_workspaces
    User.where(primary_workspace_id: id).map do |u|
      other_workspace_id = u.workspaces.where.not(id: id).first&.id
      u.update(primary_workspace_id: other_workspace_id)
    end
  end
end
