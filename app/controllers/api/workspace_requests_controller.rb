# 
# Will manage all requests from users wanting to join a workspace
# 
class Api::WorkspaceRequestsController < ApiController

  load_and_authorize_resource :workspace
  load_and_authorize_resource :workspace_request, through: %i[workspace], shallow: true

  skip_before_action :authenticate_user!

  before_action :set_workspace

  def index
    @workspace_requests = @workspace_requests
      .order(created_at: :asc)
      .page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@workspace_requests) do
          Panko::ArraySerializer.new(@workspace_requests, each_serializer: WorkspaceRequestSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@workspace_request) do
          WorkspaceRequestSerializer.new.serialize(@workspace_request).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/workspace_requests/id/accept
  def accept
    result = AcceptWorkspaceRequest.call(workspace_request: @workspace_request)
    if result.success?
      render json: WorkspaceRequestSerializer.new.serialize(result.workspace_request)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/workspace_requests/id/reject
  def reject
    result = RejectWorkspaceRequest.call(workspace_request: @workspace_request)
    if result.success?
      render json: WorkspaceRequestSerializer.new.serialize(result.workspace_request)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  private

  def set_workspace
    @workspace ||= @workspace_request&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
