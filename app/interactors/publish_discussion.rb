class PublishDiscussion
  include Interactor

  def call
    discussion = Discussion.new(context.discussion_params)
    discussion.user = context.user

    # If we create the discussion
    if discussion.save

      # We track this event
      WorkspaceHistory.track!(discussion.workspace, discussion, discussion.user)

      # And we notify the workspace members
      to_notify = discussion.workspace.user_ids - [discussion.user_id]
      puts "Notifying #{to_notify.inspect}"
      [*to_notify].compact.map do |uid|
        Notification.create!(
          code: 'workspace.discussion.created',
          user_id: uid,
          title: "#{context.user.username} posted '#{discussion.name}'",
          resource: discussion
        )
      end

      context.discussion = discussion
    else
      context.fail!(messages: discussion.errors.messages)
    end
  end
end
