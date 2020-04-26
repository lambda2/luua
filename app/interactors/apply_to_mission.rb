# When an user apply to a mission
class ApplyToMission
  include Interactor

  def call
    mission_user = MissionUser.new(mission: context.mission, user: context.user)

    # If the user can apply to the mission
    if mission_user.save

      # We track this event
      WorkspaceHistory.track!(context.mission.workspace, mission_user, context.user)

      # And we notify the mission creator
      to_notify = context.mission.created_by || context.mission.workspace.admin_ids
      puts "Notifying #{to_notify.inspect}"
      [*to_notify].compact.map do |uid|
        Notification.create!(
          code: 'mission.candidate.applied',
          user_id: uid,
          title: "#{context.user.username} applied for the mission '#{context.mission.name}'",
          resource: mission_user
        )
      end

      context.mission_user = mission_user
    else
      context.fail!(messages: mission_user.errors.messages)
    end
  end
end
