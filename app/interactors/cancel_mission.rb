# When a candidate cancel a mission
class CancelMission
  include Interactor

  def call
    if context.mission_user.cancel!

      # We track this event
      WorkspaceHistory.track!(context.workspace, context.mission_user, context.user)

      # And we notify the mission creator
      context.mission_user.mission_owner_ids.map do |uid|
        Notification.create!(
          code: 'mission.candidate.canceled',
          user_id: uid,
          title: "#{context.mission_user.user.username} canceled the mission '#{context.mission_user.mission.name}'",
          resource: context.mission_user
        )
      end

    else
      context.fail!(messages: context.mission_user.errors.messages)
    end
  end
end
