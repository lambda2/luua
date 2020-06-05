# == Schema Information
#
# Table name: message_votes
#
#  id           :bigint           not null, primary key
#  vote         :integer          default("positive"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  message_id   :bigint           not null
#  user_id      :bigint
#  workspace_id :bigint
#
# Indexes
#
#  index_message_votes_on_message_id              (message_id)
#  index_message_votes_on_user_id                 (user_id)
#  index_message_votes_on_user_id_and_message_id  (user_id,message_id) UNIQUE
#  index_message_votes_on_workspace_id            (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (message_id => messages.id)
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
class MessageVote < ApplicationRecord
  belongs_to :user
  belongs_to :workspace
  belongs_to :message, touch: true

  validates :message_id, uniqueness: { scope: %i[user_id] }

  enum vote: %i[positive negative], _suffix: true

  scope :only_roots, -> { joins(:message).where(messages: { root: true }) }

  before_validation :set_workspace_id

  counter_culture :message,
                  column_name: proc {|model| "#{model.vote}_vote_count" },
                  column_names: {
                    MessageVote.positive_vote => :positive_vote_count,
                    MessageVote.negative_vote => :negative_vote_count
                  }

  def set_workspace_id
    self.workspace_id = message&.discussion&.workspace&.id
  end
end
