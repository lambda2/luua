class Api::WorkspaceUsersController < ApiController

  load_and_authorize_resource :workspace
  load_and_authorize_resource :workspaces_user, through: %i[workspace], shallow: true

  skip_before_action :authenticate_user!

  before_action :set_workspace

  def index
    @workspace_users = @workspace_users.page(params[:page])

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
        respond_with_cache(@workspace) do
          WorkspaceUserSerializer.new.serialize(@workspace).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/workspace_users/id
  def update
    if @workspace.update(workspace_params)
      WorkspaceHistory.track!(@workspace, @workspace, current_user)
      render json: WorkspaceUserSerializer.new.serialize(@workspace)
    else
      render_error(@workspace.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/workspace_users
  def create
    @workspace = WorkspaceUser.new(workspace_params)
    @workspace.users << current_user
    if @workspace.save
      WorkspaceHistory.track!(@workspace, @workspace, current_user)
      render json: WorkspaceUserSerializer.new.serialize(@workspace)
    else
      render_error(@workspace.errors.messages, :unprocessable_entity)
    end
  end

  def workspace_params
    params.require(:workspace).permit(
      :user_id,
      :admin,
      :role
    )
  end

  private

  def set_workspace
    @workspace ||= @workspaces_user&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
