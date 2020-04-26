class Api::NotificationsController < ApiController
  load_and_authorize_resource :user
  load_and_authorize_resource :notification, through: :user, shallow: true

  def index
    @notifications = @notifications.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@notifications) do
          Panko::ArraySerializer.new(@notifications, each_serializer: NotificationSerializer).to_json
        end
      end
    end
  end

  def me
    @notifications = current_user.notifications.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@notifications) do
          Panko::ArraySerializer.new(@notifications, each_serializer: NotificationSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@notification) do
          NotificationSerializer.new.serialize(@notification).to_json
        end
      end
    end
  end

  def read
    if @notification.read!(notification_params)
      render json: NotificationSerializer.new.serialize(@notification)
    else
      render_error(@notification.errors.messages, :unprocessable_entity)
    end
  end

  # def notification_params
  #   params.require(:notification).permit()
  # end

end
