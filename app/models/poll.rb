# == Schema Information
#
# Table name: polls
#
#  id                     :bigint           not null, primary key
#  anonymity              :integer          default(0), not null
#  authentication         :integer          default(0), not null
#  begin_at               :datetime
#  category               :integer          default(0), not null
#  description            :text             not null
#  end_at                 :datetime
#  locked_at              :datetime
#  locked_by              :integer
#  name                   :string           not null
#  poll_type              :integer          default(0), not null
#  slug                   :string           not null
#  visibility             :integer          default("draft"), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  discussion_category_id :bigint
#  discussion_id          :bigint
#  user_id                :bigint           not null
#  workspace_id           :bigint           not null
#
# Indexes
#
#  index_polls_on_discussion_category_id  (discussion_category_id)
#  index_polls_on_discussion_id           (discussion_id)
#  index_polls_on_user_id                 (user_id)
#  index_polls_on_workspace_id            (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_category_id => discussion_categories.id)
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
class Poll < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :workspace
  belongs_to :discussion, optional: true
  belongs_to :discussion_category, optional: true
  belongs_to :user

  has_many :poll_options, dependent: :destroy
  has_many :user_votes, dependent: :destroy

  has_many :notifications, as: :resource, dependent: :destroy

  # - draft: Poll is not published yet, and only visible for the editor
  # - hidden: Poll is only visible for editor and workspace admin
  # - protected: Poll is only visible for workspace members
  # - public: Poll is visible to everyone
  enum visibility: %i[draft hidden protected public], _suffix: true

  accepts_nested_attributes_for :poll_options,
                                allow_destroy: true,
                                reject_if: :all_blank

  def lock!
    update(locked_at: Time.zone.now, locked_by: Current.user&.id)
  end

  def locked?
    !locked_at.nil?
  end
end