# When someone invite an user to a workspace
class JoinWorkspace
  include Interactor

  def call
    workspace = context.workspace

    context.fail!(messages: 'Unable to join this workspace') if workspace.closed_membership?

    # If the workspace is open, we accept him
    add_new_member!(context) if workspace.open_membership?

    # If the workspace is on approval only, we send a request
    request_to_join!(context) if workspace.approval_membership?
  end

  def add_new_member!(context)
    context.workspace_request = WorkspaceRequest.new(
      workspace: context.workspace,
      user: context.user
    )

    if context.workspace_request.save
      # We track this event
      context.workspace_request.accept!
      WorkspaceHistory.track!(context.workspace, context.workspace_request, context.workspace_request.user)

      context.workspace.admin_ids.each do |admin_id|
        # And we notify the workspace admins that someone joined
        Notification.create!(
          code: 'workspace.member.joined',
          user_id: admin_id,
          title: "#{context.user.username} joined the workspace '#{context.workspace.name}'",
          resource: context.workspace_request
        )
      end

    else
      context.fail!(messages: context.workspace_request.errors.messages)
    end
  end

  def request_to_join!(context)
    context.workspace_request = WorkspaceRequest.new(
      workspace: context.workspace,
      user: context.user
    )

    if context.workspace_request.save
      # We track this event
      WorkspaceHistory.track!(context.workspace, context.workspace_request, context.workspace_request.user)

      context.workspace.admin_ids.each do |admin_id|
        # And we notify the workspace admins that someone joined
        Notification.create!(
          code: 'workspace.request.created',
          user_id: admin_id,
          title: "#{context.user.username} asked to join the workspace '#{context.workspace.name}'",
          resource: context.workspace_request
        )
      end

    else
      context.fail!(messages: context.workspace_request.errors.messages)
    end
  end
end
