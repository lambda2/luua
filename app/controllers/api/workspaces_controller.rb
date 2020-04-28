class Api::WorkspacesController < ApiController
  load_and_authorize_resource
  # before_action :set_workspace, only: %i[show update]
  skip_before_action :authenticate_user!

  def index
    @workspaces = @workspaces.search(params[:q]) if params[:q]
    @workspaces = @workspaces.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@workspaces) do
          Panko::ArraySerializer.new(@workspaces, each_serializer: WorkspaceLightSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@workspace) do
          WorkspaceSerializer.new.serialize(@workspace).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/workspaces/id
  def update
    if @workspace.update(workspace_params)
      WorkspaceHistory.track!(@workspace, @workspace, current_user)
      render json: WorkspaceSerializer.new.serialize(@workspace)
    else
      render_error(@workspace.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/workspaces
  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.users << current_user
    if @workspace.save
      WorkspaceHistory.track!(@workspace, @workspace, current_user)
      render json: WorkspaceSerializer.new.serialize(@workspace)
    else
      render_error(@workspace.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/workspaces/id/invite
  def invite
    user = User.find_by(username: params[:username])
    wi = WorkspaceInvitation.new(
      workspace: @workspace,
      user: user,
      email: user&.email || params[:email],
      inviter: current_user,
      send_email: params[:send_email] || false
    )

    puts wi.inspect

    if wi.save
      WorkspaceHistory.track!(@workspace, wi, current_user)
      render json: WorkspaceInvitationSerializer.new.serialize(wi)
    else
      render_error(wi.errors.messages, :unprocessable_entity)
    end
  end

  def workspace_params
    params.require(:workspace).permit(
      :name,
      :description,
      :region_id,
      :country_id,
      :workspace_type,
      :image,
      :remove_image,
      :color
    )
  end

  private # rubocop:todo Lint/UselessAccessModifier

  # Use callbacks to share common setup or constraints between actions.
  # def set_workspace
  #   @workspace = Workspace.friendly.find(params[:id])
  # end
end
