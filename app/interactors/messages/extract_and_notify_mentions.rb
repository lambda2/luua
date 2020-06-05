# Returns all the mentions contained in a message
class Messages::ExtractAndNotifyMentions
  include Interactor

  def call

    if !context.message || context.message.serialized_content&.blank?
      context.fail!(messages: ['No content'])
    end

    # We get all the mentioned users
    context.mentions = Parser::ExtractMessageMentions.from_string_serialized_content(context.message&.serialized_content)

    # We link them to the discussion in database
    context.message_mentions = context.mentions.map do |mention|
      user = User.friendly.find(mention)
      MessageMention.where(user: user, message: context.message, discussion: context.message.discussion).first_or_create
    end

    # We notify them
    context.message_mentions.map do |mm|
      Notification.where(resource: mm).first_or_create(
        code: 'message.mention.created',
        user_id: mm.user_id,
        title: "You have been mentioned in the discussion '#{mm.discussion.name}'",
        resource: mm
      )
    end

  end
end
