class CloseVoteWorker < ApplicationWorker
  include Sidekiq::Worker
  sidekiq_options queue: :polls, retry: true, backtrace: true

  def perform(poll_id)
    poll = Poll.find(poll_id)

    return if poll&.closed?

    if poll&.end_at&.future?
      Rails.logger.info "Poll #{poll.id} #{poll.slug} is not end yet, delaying to #{poll&.end_at}..."
      CloseVoteWorker.perform_at(poll&.end_at, poll_id)
    end

    if poll&.end_at&.past? # rubocop:todo Style/GuardClause
      Rails.logger.info "Closing poll #{poll.id} #{poll.slug}"
      poll.close!
    end
  end
end
