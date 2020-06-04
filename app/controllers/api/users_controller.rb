class Api::UsersController < ApiController
  load_and_authorize_resource
  before_action :set_user, only: %i[show update destroy]
  skip_before_action :authenticate_user!, only: %i[show]

  def me
    authorize! :me, current_user

    render json: UserDetailsSerializer.new.serialize(current_user)
  end

  def show
    render json: UserSerializer.new.serialize(@user)
  end

  def search
    @users ||= User.all
    # @users = User.joins(:workspace_users)
    #              .where(workspace_users: {workspace_id: current_user.workspace_ids})
    #              .distinct
    @users = @users.search(params[:q]) if params[:q]
    @users = paginate(@users)

    respond_to do |format|
      format.json do
        respond_with_cache(@users) do
          Panko::ArraySerializer.new(@users, each_serializer: UserSerializer).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/users/id
  def update
    if @user.update(user_params)
      render json: UserDetailsSerializer.new.serialize(@user)
    else
      render_error(@user.errors.messages, :unprocessable_entity)
    end
  end

  def user_params
    params.require(:user).permit(
      :username,
      :image,
      :remove_image,
      :first_name,
      :last_name,
      :country_id,
      :timezone,
      :email_newsletters,
      :email_notifications,
      user_skills_attributes: %i[id skill_id level _destroy]
    )
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.friendly.find(params[:id])
  end
end
