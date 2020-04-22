# typed: true
class Api::UsersController < ApiController
  load_and_authorize_resource
  before_action :set_user, only: %i[show update destroy]

  def me
    authorize! :me, current_user

    render json: UserDetailsSerializer.new.serialize(current_user)
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
      user_skills_attributes: %i[id skill_id level _destroy]
    )
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.friendly.find(params[:id])
  end
end
