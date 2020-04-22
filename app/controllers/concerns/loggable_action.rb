module LoggableAction
  extend ActiveSupport::Concern

  included do
    before_action :set_current_context
  end

  private

  def set_current_context
    Current.user = current_user if current_user
    Current.request_id = request.uuid
    Current.user_agent = request.user_agent
    Current.ip_address = request.ip
  end
end
