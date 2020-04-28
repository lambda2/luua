# When someone invite an user to a workspace
class InviteToWorkspace
  include Interactor

  def call
    workspace = context.workspace
    username = context.username
    inviter = context.inviter
    email = context.email
    send_email = context.send_email || false

    user = User.find_by(username: username)

    context.fail!(messages: { username: ["Unable to find user #{username}"] }) if !username.blank? && user.nil?

    context.workspace_invitation = WorkspaceInvitation.new(
      workspace: workspace,
      user: user,
      email: user&.email || email,
      inviter: inviter,
      send_email: send_email
    )

    if context.workspace_invitation.save
      track_and_notifiy!(context)
    else
      context.fail!(messages: context.workspace_invitation.errors.messages)
    end
  end

  def track_and_notifiy!(context)
    # We track this event
    WorkspaceHistory.track!(context.workspace, context.workspace_invitation, context.workspace_invitation.user)

    return unless context.workspace_invitation.user

    # And we notify the invited user if we have one
    Notification.create!(
      code: 'workspace.invitation.created',
      user_id: context.workspace_invitation.user_id,
      title: "You have been invited to join the workspace '#{context.workspace.name}'",
      resource: context.workspace_invitation
    )
  end
end
