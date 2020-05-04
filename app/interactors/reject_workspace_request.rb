# When a candidate is accepted for a mission
class RejectWorkspaceRequest
  include Interactor

  def call
    if context.workspace_request.reject!

      # We track this event
      WorkspaceHistory.track!(context.workspace_request.workspace, context.workspace_request, context.user)

      # And we notify the candidate
      Notification.create!(
        code: 'workspace.request.rejected',
        user_id: context.workspace_request.user_id,
        title: "Your request to join the workspace #{context.workspace_request.workspace.name} has been rejected",
        resource: context.workspace_request
      )
      replace_notification!(context)

    else
      context.fail!(messages: context.workspace_request.errors.messages)
    end
  end

  def replace_notification!(context)
    notification = Notification.find_by(
      resource: context.workspace_request,
      code: 'workspace.request.created'
    )

    return unless notification

    # We change the notification to hide the buttons and all
    notification.update(code: 'workspace.request._rejected')

    # And we mark it as read
    notification.read!
  end
end
