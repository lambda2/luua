class Vote
  include Interactor

  def call
    poll_option_id = context.poll_option_id
    user = context.user
    poll = context.poll
    context.user_vote = nil

    UserVote.transaction do
      context.user_vote = UserVote.create!(
        poll_option_id: poll_option_id,
        poll: poll,
        user: user
      )
      PollOption.increment_counter :vote_count, poll_option_id
      Poll.increment_counter :vote_count, context.poll.id
    end
  end
end
