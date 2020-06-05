class EndMissionWorker < ApplicationWorker
  include Sidekiq::Worker
  sidekiq_options queue: :missions, retry: true, backtrace: true

  def perform(mission_id)
    mission = Mission.find(mission_id)

    return unless mission&.started? || mission&.open? || mission&.pending?

    if mission&.end_at&.future?
      Rails.logger.info "Mission #{mission.id} #{mission.slug} is not end yet, delaying to #{mission&.end_at}..."
      EndMissionWorker.perform_at(mission&.end_at, mission_id)
    end

    if mission&.end_at&.past? # rubocop:todo Style/GuardClause
      Rails.logger.info "Closing mission #{mission.id} #{mission.slug}"
      mission.close!
    end
  end
end
