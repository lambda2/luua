# When a candidate is accepted for a mission
class ReviewMission
  include Interactor

  def call
    if context.mission_user.review!

      # We track this event
      WorkspaceHistory.track!(context.workspace, context.mission_user, context.user)

      # And we notify the candidate
      Notification.create!(
        code: 'mission.candidate.reviewed',
        user_id: context.mission_user.user_id,
        title: "#{context.mission_user.user.username} has been reviewed for the mission '#{context.mission_user.mission.name}'",
        resource: context.mission_user
      )

    else
      context.fail!(messages: context.mission_user.errors.messages)
    end
  end
end
