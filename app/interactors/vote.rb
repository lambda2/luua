class Vote
  include Interactor

  def call
    poll_option_id = context.poll_option_id
    user = context.user
    poll = context.poll

    context.user_vote = UserVote.create!(
      poll_option_id: poll_option_id,
      poll: poll,
      user: user
    )
  end
end
