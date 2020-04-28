class Api::WorkspaceInvitationsController < ApiController

  load_and_authorize_resource :workspace
  load_and_authorize_resource :workspace_invitation, through: %i[workspace], shallow: true

  skip_before_action :authenticate_user!

  before_action :set_workspace

  def index
    @workspace_invitations = @workspace_invitations
      .order(created_at: :asc)
      .page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@workspace_invitations) do
          Panko::ArraySerializer.new(@workspace_invitations, each_serializer: WorkspaceInvitationSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@workspace_invitation) do
          WorkspaceInvitationSerializer.new.serialize(@workspace_invitation).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/workspace_invitations/id
  def update
    if @workspace_invitation.update(workspace_invitation_params)
      WorkspaceHistory.track!(@workspace, @workspace_invitation, current_user)
      render json: WorkspaceInvitationSerializer.new.serialize(@workspace_invitation)
    else
      render_error(@workspace_invitation.errors.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/workspace_invitations/id/accept
  def accept
    result = AcceptWorkspaceInvitation.call(workspace_invitation: @workspace_invitation)
    if result.success?
      render json: WorkspaceInvitationSerializer.new.serialize(result.workspace_invitation)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/workspace_invitations/id/reject
  def reject
    result = RejectWorkspaceInvitation.call(workspace_invitation: @workspace_invitation)
    if result.success?
      render json: WorkspaceInvitationSerializer.new.serialize(result.workspace_invitation)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/workspace_invitations/id
  def destroy
    @workspace_invitation.destroy!
    render_destroyed
  end

  # POST /api/workspace_invitations
  def create
    @workspace_invitation = WorkspaceInvitation.new(workspace_invitation_params)

    if @workspace_invitation.save
      WorkspaceHistory.track!(@workspace, @workspace_invitation, current_user)
      render json: WorkspaceInvitationSerializer.new.serialize(@workspace_invitation)
    else
      render_error(@workspace_invitation.errors.messages, :unprocessable_entity)
    end
  end


  def workspace_invitation_params
    params.require(:workspace_invitation).permit(
      :id,
      :email,
      :send_email,
      :status,
      :inviter_id,
      :user_id
    )
  end

  private

  def set_workspace
    @workspace ||= @workspace_invitation&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
