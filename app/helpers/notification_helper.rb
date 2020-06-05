module NotificationHelper
  def translated_notification(notification, key = :title)
    scope, subscope, action = notification.code.split('.')
    resource = notification&.resource

    base_params = {}

    base_params.merge!(username: resource&.user&.username) if resource.respond_to?(:user)
    base_params.merge!(workspace_name: resource&.workspace&.name) if resource.respond_to?(:workspace)
    base_params.merge!(mission_name: resource&.mission&.name) if resource.respond_to?(:mission)
    base_params.merge!(discussion_name: resource&.discussion&.name) if resource.respond_to?(:discussion)
    base_params.merge!(inviter: resource&.inviter&.username) if resource.respond_to?(:inviter)
    base_params.merge!("#{resource.class.to_s.underscore}_name".to_sym => resource&.name) if resource.respond_to?(:name)

    t("notifications.#{notification.code}.#{key}", base_params)
  end
end
