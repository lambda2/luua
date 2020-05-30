# == Schema Information
#
# Table name: polls
#
#  id                     :bigint           not null, primary key
#  anonymity              :integer          default("anonymous"), not null
#  authentication         :integer          default("required"), not null
#  begin_at               :datetime
#  category               :integer          default(0), not null
#  closed_at              :datetime
#  closed_by              :integer
#  description            :text             not null
#  end_at                 :datetime
#  name                   :string           not null
#  poll_type              :integer          default("single_choice"), not null
#  reveal                 :integer          default("on_close"), not null
#  slug                   :string           not null
#  visibility             :integer          default("draft"), not null
#  vote_count             :integer          default(0), not null
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

  belongs_to :workspace, counter_cache: true, touch: true
  belongs_to :discussion, touch: true
  # belongs_to :discussion_category, through: :discussion
  belongs_to :user

  has_many :user_votes, dependent: :destroy
  has_many :poll_options, dependent: :destroy

  has_many :notifications, as: :resource, dependent: :destroy

  # - draft: Poll is not published yet, and only visible for the editor
  # - hidden: Poll is only visible for editor and workspace admin
  # - protected: Poll is only visible for workspace members
  # - public: Poll is visible to everyone
  enum visibility: %i[draft hidden protected public], _suffix: true

  # - open: The votes can be anonymous or not, it's up to the voter
  # - anonymous: The vote is anonymous, and the voter identity is secret
  # - not_anonymous: the voter identity is published
  enum anonymity: %i[anonymous not_anonymous open], _suffix: true

  # - required: the voter must be authentified
  # - not_required: the voter can be unauthenticated
  enum authentication: %i[required not_required], _suffix: true

  # - on_close: results are revealed when the poll is closed (final results)
  # - on_vote: current results are revealed after each vote
  # - always: results are always revealed, even if an user didn't voted
  enum reveal: %i[on_close on_vote always], _suffix: true

  enum poll_type: %i[single_choice], _suffix: true

  accepts_nested_attributes_for :poll_options,
                                allow_destroy: true,
                                reject_if: :all_blank

  validates :name, uniqueness: { scope: %i[workspace_id] }

  validate :validates_amount_of_polls

  after_save :schedule_closing

  def validates_amount_of_polls
    errors.add(:poll_options_attributes, 'must have at least 2 choices') if poll_options.size < 2
  end

  def user_votes_results(user = nil)
    return if anonymous_anonymity?
    return user_votes if always_reveal?
    return user_votes if on_close_reveal? && closed?
    return user_votes if on_vote_reveal? && user_votes.where(user_id: user&.id).any?
  end

  def close!
    update(closed_at: Time.zone.now, closed_by: Current.user&.id)
  end

  def closed?
    !closed_at.nil?
  end

  # Will schedule the closing of the poll at the "end_at" date
  def schedule_closing
    return unless end_at_previously_changed?

    CloseVoteWorker.delete_all(id)

    return unless end_at

    CloseVoteWorker.perform_at(end_at, id)
  end
end
