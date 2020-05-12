# == Schema Information
#
# Table name: message_votes
#
#  id         :bigint           not null, primary key
#  vote       :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  message_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_message_votes_on_message_id              (message_id)
#  index_message_votes_on_user_id                 (user_id)
#  index_message_votes_on_user_id_and_message_id  (user_id,message_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (message_id => messages.id)
#  fk_rails_...  (user_id => users.id)
#
class MessageVote < ApplicationRecord
  belongs_to :user
  belongs_to :message

  validates :message_id, uniqueness: { scope: %i[user_id] }

  enum vote: %i[positive negative], _suffix: true

  counter_culture :message,
                  column_name: proc {|model| "#{model.vote}_vote_count" },
                  column_names: {
                    MessageVote.positive_vote => :positive_vote_count,
                    MessageVote.negative_vote => :negative_vote_count
                  }

end
