class Api::WorkspaceUsersController < ApiController

  load_and_authorize_resource :workspace
  load_and_authorize_resource :user
  load_and_authorize_resource :workspace_user, through: %i[user workspace], shallow: true

  skip_before_action :authenticate_user!

  before_action :set_workspace

  def index
    @workspace_users = @workspace_users
      .order(created_at: :asc)
      .page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@workspace_users) do
          Panko::ArraySerializer.new(@workspace_users, each_serializer: WorkspaceUserSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@workspace_user) do
          WorkspaceUserSerializer.new.serialize(@workspace_user).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/workspace_users/id
  def update
    if @workspace_user.update(workspace_user_params)
      WorkspaceHistory.track!(@workspace, @workspace_user, current_user)
      render json: WorkspaceUserSerializer.new.serialize(@workspace_user)
    else
      render_error(@workspace_user.errors.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/workspace_users/id
  def destroy
    @workspace_user.destroy!
    render_destroyed
  end

  # POST /api/workspace_users
  def create
    @workspace_user = WorkspaceUser.new(workspace_user_params)

    if @workspace_user.save
      WorkspaceHistory.track!(@workspace, @workspace_user, current_user)
      render json: WorkspaceUserSerializer.new.serialize(@workspace_user)
    else
      render_error(@workspace_user.errors.messages, :unprocessable_entity)
    end
  end

  def workspace_user_params
    params.require(:workspace_user).permit(
      :id,
      :user_id,
      :admin,
      :role
    )
  end

  private

  def set_workspace
    @workspace ||= @workspace_user&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
