#
# When a user reject an invitation to join a workspace
#
class RejectWorkspaceInvitation
  include Interactor

  def call
    if context.workspace_invitation.rejected_status!

      # We track this event
      WorkspaceHistory.track!(context.workspace_invitation.workspace, context.workspace_invitation, context.workspace_invitation.user)

      # We replace the user notification
      replace_notification! context

      # And we notify the inviter that we've rejected the invite
      Notification.create!(
        code: 'workspace.invitation.rejected',
        user_id: context.workspace_invitation.inviter_id,
        title: "#{context.workspace_invitation.user.username} declined the invitation to join the workspace '#{context.workspace_invitation.workspace.name}'",
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
    notification.update(code: 'workspace.invitation._rejected')

    # And we mark it as read
    notification.read!
  end

end
