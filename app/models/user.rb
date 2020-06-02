# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  admin                  :boolean          default(FALSE), not null
#  bio                    :text
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  failed_attempts        :integer          default(0), not null
#  first_name             :string
#  image                  :string
#  jti                    :string
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  locale                 :string           default("fr"), not null
#  locked_at              :datetime
#  provider               :string           default("email"), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  slug                   :string
#  timezone               :string
#  token                  :text
#  uid                    :string           default(""), not null
#  unconfirmed_email      :string
#  unlock_token           :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  country_id             :integer
#  primary_workspace_id   :bigint
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_primary_workspace_id  (primary_workspace_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (primary_workspace_id => workspaces.id)
#

require 'carrierwave/orm/activerecord'

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  mount_base64_uploader :image, AvatarUploader

  has_many :workspace_requests, dependent: :destroy
  has_many :workspace_users, dependent: :destroy
  has_many :workspaces, through: :workspace_users
  has_many :organizations, through: :workspaces

  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills

  belongs_to :country, optional: true

  has_one :primary_workspace, class_name: 'Workspace', foreign_key: :id

  has_many :workspace_histories, as: :resource, dependent: :nullify

  has_many :notifications, dependent: :destroy

  has_many :messages, dependent: :nullify

  has_many :mission_users, dependent: :destroy
  has_many :missions, through: :mission_users

  before_create :assign_token
  before_create :assign_uid

  accepts_nested_attributes_for :user_skills,
                                allow_destroy: true,
                                reject_if: :all_blank

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :timeoutable, :trackable,
         :jwt_authenticatable, jwt_revocation_strategy: self # , :omniauthable

  # validates :country, allow_blank: true, inclusion: { in: ISO3166::Country.all.map(&:name),

  validates :timezone, allow_blank: true, inclusion: { in: ActiveSupport::TimeZone.all.map(&:name),
                                                       message: '%{value} is not a valid timezone' } # rubocop:todo Style/FormatStringToken

  validates :email, uniqueness: true, case_sensitive: false
  validates :username, uniqueness: true, case_sensitive: false, allow_blank: true
  validates :token, uniqueness: true, case_sensitive: false
  validates :uid, uniqueness: true, case_sensitive: false

  scope :search, ->(q) { where('LOWER(unaccent(first_name)) ILIKE LOWER(unaccent(?)) OR LOWER(unaccent(username)) ILIKE LOWER(unaccent(?)) OR LOWER(unaccent(last_name)) ILIKE LOWER(unaccent(?))', "%#{q}%", "%#{q}%", "%#{q}%") }

  def assign_token
    self.token = SecureRandom.urlsafe_base64(38)
  end

  def assign_uid
    self.uid = SecureRandom.uuid
  end

  def regenerate_token!
    update(token: SecureRandom.urlsafe_base64(38))
  end

  def admin_workspace_ids
    workspace_users.where(admin: true).pluck(:workspace_id)
  end

  def jwt_payload
    super.merge(
      email: email
    )
  end

  def slug_candidates
    [
      :username,
      %i[username country]
    ]
  end

end
