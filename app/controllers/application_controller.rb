# typed: false
class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  respond_to :json
  include LoggableAction

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  check_authorization unless: :devise_controller?
  # skip_before_action :authenticate_user!, if: :devise_controller?

  before_action :set_default_workspace
  before_action :set_raven_context
  after_action :log_action

  protected

  # Attributes we allow for sign up/in
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username country])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:username])
  end

  def set_default_workspace
    @current_workspace ||= Workspace.friendly.find(params[:workspace_id]) if params[:workspace_id]
    @current_workspace ||= current_user.primary_workspace if user_signed_in?
  end

  def log_action
    Rails.logger.info "#{params[:action]} on #{params[:controller]} by #{Current.user.try(:email)} (#{Current.application})"
  end

  # :nocov:

  def set_raven_context
    Raven.user_context(id: current_user.try(:id), email: current_user.try(:email))
    Raven.extra_context(params: params.to_unsafe_h, url: request.url, email: current_user.try(:email))
  end

  # inherit_resources

  def set_user_metadata!
    Current.application = "#{Rails.try(:app_class) || 'Unknown app'} API"
    Current.user = current_user if current_user
    Current.request_id = request.uuid
    Current.user_agent = request.user_agent
    Current.ip_address = request.ip

    Current.application = "#{request.headers['Luua-Application']} via #{Rails.try(:app_class) || 'Unknown app'} API" if request.headers['Luua-Application']
  end

  def respond_with_cache(collection, key = nil, last_modified = nil, delay = 5.seconds)
    expires_in delay

    end_key = (key || "luua/#{params[:action] || 'gen'}/#{collection.respond_to?(:load) ? collection.load.cache_key : collection.cache_key}")

    last_modified ||= collection.respond_to?(:updated_at) ? collection.updated_at : collection.order(:updated_at).last.try(:updated_at)

    if stale?(etag: end_key, template: false, last_modified: last_modified) # rubocop:todo Style/GuardClause
      serialized_collection = Rails.cache.fetch(end_key) do
        yield
      end
      render(json: serialized_collection) && return
    end
  end

  # :nocov:

  # def render_success(data, status = 200)
  #   render json: { success: true, payload: data }, status: status
  # end

  # def render_error(message, status)
  #   render json: { success: false, error: message }, status: status
  # end

  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.debug "⚠️  Access denied\n\tON #{exception.action} #{exception.subject.inspect}\n\tFOR #{current_user.inspect}\n"

    respond_to do |format|
      format.json { head :forbidden, content_type: 'text/html' }
      format.html { redirect_to main_app.root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end

end
