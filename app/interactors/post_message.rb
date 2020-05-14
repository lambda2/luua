class PostMessage
  include Interactor

  def call
    message = Message.new(context.message_params)
    message.user = context.user

    # If we create the message
    if message.save

      # We track this event @TODO do we ?
      # WorkspaceHistory.track!(
      #   message&.discussion&.workspace,
      #   message,
      #   message.user
      # )

      # And we notify the discussion participants
      to_notify = message.discussion.subscriber_ids
      puts "Notifying #{to_notify.inspect}"
      [*to_notify].compact.map do |uid|
        Notification.create!(
          code: 'discussion.message.created',
          user_id: uid,
          title: "#{context.user.username} posted a message",
          resource: message
        )
      end

      context.message = message
    else
      context.fail!(messages: message.errors.messages)
    end
  end
end
