# == Schema Information
#
# Table name: user_votes
#
#  id             :bigint           not null, primary key
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  poll_id        :bigint           not null
#  poll_option_id :bigint
#  user_id        :bigint           not null
#
# Indexes
#
#  index_user_votes_on_poll_id              (poll_id)
#  index_user_votes_on_poll_option_id       (poll_option_id)
#  index_user_votes_on_user_id              (user_id)
#  index_user_votes_on_user_id_and_poll_id  (user_id,poll_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (poll_id => polls.id)
#  fk_rails_...  (poll_option_id => poll_options.id)
#  fk_rails_...  (user_id => users.id)
#
class UserVoteSerializer < Panko::Serializer
  attributes :id

  has_one :poll, serializer: PollLightSerializer
  has_one :user, serializer: UserLightSerializer
  has_one :poll_option, serializer: PollOptionSerializer

end
