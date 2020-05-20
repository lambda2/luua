class CloseVoteWorker
  include Sidekiq::Worker
  sidekiq_options queue: :polls, retry: true, backtrace: true

  def perform(poll_id)
    poll = Poll.find(poll_id)

    if poll&.end_at&.future?
      Rails.logger.info "Poll #{poll.id} #{poll.slug} is not end yet, delaying to #{poll&.end_at}..."
      CloseVoteWorker.perform_at(poll&.end_at, poll_id)
    end

    if poll&.end_at&.past?
      Rails.logger.info "Closing poll #{poll.id} #{poll.slug}"
      poll.close!
    end

  end

  def self.delete_all(poll_id)
    jobs = Sidekiq::ScheduledSet.new.select do |retri| 
      retri.klass == 'CloseVoteWorker' && retri.args == [poll_id]
    end
    jobs.each(&:delete)
  end
end
