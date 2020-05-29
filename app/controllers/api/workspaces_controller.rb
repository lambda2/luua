class Api::WorkspacesController < ApiController
  load_and_authorize_resource
  # before_action :set_workspace, only: %i[show update]
  skip_before_action :authenticate_user!

  has_scope :open_membership, type: :boolean
  has_scope :approval_membership, type: :boolean
  has_scope :closed_membership, type: :boolean

  def index
    @workspaces = apply_scopes(@workspaces)
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

  def me
    @workspaces = current_user.workspaces
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

  def categories
    @discussion_categories = @workspace.discussion_categories
    @discussion_categories = @discussion_categories.search(params[:q]) if params[:q]
    @discussion_categories = @discussion_categories.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@discussion_categories) do
          Panko::ArraySerializer.new(@discussion_categories, each_serializer: DiscussionCategorySerializer).to_json
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
    result = InviteToWorkspace.call(
      workspace: @workspace,
      username: params[:username],
      inviter: current_user,
      email: params[:email],
      send_email: params[:send_email]
    )

    if result.success?
      render json: WorkspaceInvitationSerializer.new.serialize(result.workspace_invitation)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  # POST /api/workspaces/id/join
  def join
    result = JoinWorkspace.call(
      workspace: @workspace,
      user: current_user
    )

    if result.success?
      render json: WorkspaceRequestSerializer.new.serialize(result.workspace_request)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  def workspace_params
    params.require(:workspace).permit(
      :name,
      :description,
      :membership,
      :region_id,
      :country_id,
      :workspace_type,
      :image,
      :remove_image,
      :color
    )
  end

end
