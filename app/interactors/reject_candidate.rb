# When a candidate is accepted for a mission
class RejectCandidate
  include Interactor

  def call
    if context.mission_user.reject!

      # We track this event
      WorkspaceHistory.track!(context.workspace, context.mission_user, context.user)

      # And we notify the candidate
      Notification.create!(
        code: 'mission.candidate.rejected',
        user_id: context.mission_user.user_id,
        title: "#{context.mission_user.user.username} has been rejected for the mission '#{context.mission_user.mission.name}'",
        resource: context.mission_user
      )

    else
      context.fail!(messages: context.mission_user.errors.messages)
    end
  end
end
