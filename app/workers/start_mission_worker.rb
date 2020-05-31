class StartMissionWorker
  include Sidekiq::Worker
  sidekiq_options queue: :missions, retry: true, backtrace: true

  def perform(mission_id)
    mission = Mission.find(mission_id)

    return unless mission&.open?

    if mission&.begin_at&.future?
      Rails.logger.info "Mission #{mission.id} #{mission.slug} is not started yet, delaying to #{mission&.begin_at}..."
      StartMissionWorker.perform_at(mission&.begin_at, mission_id)
    end

    if mission&.begin_at&.past? # rubocop:todo Style/GuardClause
      Rails.logger.info "Starting mission #{mission.id} #{mission.slug}"
      mission.start!
    end
  end

  def self.delete_all(mission_id)
    jobs = Sidekiq::ScheduledSet.new.select do |retri|
      retri.klass == 'StartMissionWorker' && retri.args == [mission_id]
    end
    jobs.each(&:delete)
  end
end
