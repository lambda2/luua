#
# When a user accept an invitation to join a workspace
#
class AcceptWorkspaceInvitation
  include Interactor

  def call
    if context.workspace_invitation.accepted_status!

      # We track this event
      WorkspaceHistory.track!(context.workspace_invitation.workspace, context.workspace_invitation, context.workspace_invitation.user)

      # We replace the user notification
      replace_notification! context

      # We add the user to the workspace
      add_member! context

      # And we notify the inviter that we've accepted the invite
      Notification.create!(
        code: 'workspace.invitation.accepted',
        user_id: context.workspace_invitation.inviter_id,
        title: "#{context.workspace_invitation.user.username} joined the workspace '#{context.workspace_invitation.workspace.name}'",
        resource: context.workspace_invitation
      )

    else
      context.fail!(messages: context.mission_user.errors.messages)
    end
  end

  def replace_notification!(context)
    notification = Notification.find_by(
      resource: context.workspace_invitation,
      user: context.workspace_invitation.user,
      code: 'workspace.invitation.created'
    )

    return unless notification

    # We change the notification to hide the buttons and all
    notification.update(code: 'workspace.invitation._accepted')

    # And we mark it as read
    notification.read!
  end

  def add_member!(context)
    # We add the user to the workspace
    wu = WorkspaceUser.new(
      workspace: context.workspace_invitation.workspace,
      user: context.workspace_invitation.user
    )

    if wu.save
      # We track this event
      WorkspaceHistory.track!(wu.workspace, wu, wu.user)
    else
      context.fail!(messages: wu.errors.messages)
    end
  end
end
