# == Schema Information
#
# Table name: discussions
#
#  id            :bigint           not null, primary key
#  description   :text
#  name          :string           not null
#  resource_type :string           not null
#  slug          :string           not null
#  visibility    :integer          default(0), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_discussions_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_discussions_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Discussion < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user
  belongs_to :resource, polymorphic: true, optional: true

  has_many :messages

  has_many :notifications, as: :resource

  # @TODO discussion visibilities
  #
  # - draft: Discussion is not published yet, and only visible for the editor
  # - hidden: Discussion is only visible for editor and workspace admin
  # - protected: Discussion is only visible for workspace members
  # - public: Discussion is visible to everyone
  # enum visibility: %i[draft hidden protected public], _suffix: true

  # def self.visible_for(user_id)
  #   return where(visibility: :public) unless user_id

  #   disc = <<-SQL
  #       discussions.visibility = #{Discussion.visibilities[:public]} OR
  #       (
  #         discussions.visibility IN (#{Discussion.visibilities[:draft]}, #{Discussion.visibilities[:hidden]}, #{Discussion.visibilities[:protected]}) AND
  #         user_id = #{user_id}
  #       ) OR
  #       ("workspace_users"."user_id" = #{user_id} AND visibility = #{Discussion.visibilities[:protected]}) OR
  #       ("workspace_users"."user_id" = #{user_id} AND "workspace_users"."admin" = true AND visibility = #{Discussion.visibilities[:hidden]})
  #   SQL

  #   joins(workspace: :workspace_users).where(disc)
  # end

  def lock!
    update(locked_at: Time.zone.now, locked_by: Current.user&.id)
  end

  def locked?
    !locked_at.nil?
  end
end
