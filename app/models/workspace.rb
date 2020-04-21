# == Schema Information
#
# Table name: workspaces
#
#  id              :bigint           not null, primary key
#  image           :string
#  missions_count  :integer          default(0), not null
#  name            :string           not null
#  slug            :string           not null
#  users_count     :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint
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
  has_many :workspaces_users, dependent: :destroy

  # Keep track of events in the workspace
  has_many :workspace_histories, dependent: :destroy

  has_many :users, through: :workspaces_users
  has_many :missions, dependent: :destroy

  has_many :mission_users, through: :missions

  has_many :projects, dependent: :destroy
  has_many :priorities, dependent: :destroy

  validates :name, uniqueness: true

  # enum workspace_type: %i[main company personal]

  after_create :create_default_priorities!
  before_validation :generate_slug
  before_destroy :roll_default_workspaces

  # mount_uploader :image, AvatarUploader
  mount_base64_uploader :image, AvatarUploader

  # def operated_by
  #   Workspace.find_by_name('Team')
  # end

  # def active_operator
  #   users.first
  # end

  def admin_ids
    workspaces_users.where(admin: true).pluck(:user_id)
  end

  def generate_slug
    self.slug = name.parameterize
  end

  def create_default_priorities!
    return unless priorities.empty?

    Priority.defaults!(id)
  end

  def roll_default_workspaces
    User.where(primary_workspace_id: id).map do |u|
      other_workspace_id = u.workspaces.where.not(id: id).first&.id
      u.update(primary_workspace_id: other_workspace_id)
    end
  end
end
