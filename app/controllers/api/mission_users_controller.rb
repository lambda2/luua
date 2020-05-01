class Api::MissionUsersController < ApiController
  load_and_authorize_resource :mission
  load_and_authorize_resource :workspace
  load_and_authorize_resource :user
  load_and_authorize_resource :mission_user, through: %i[user mission workspace], shallow: true

  skip_before_action :authenticate_user!

  before_action :set_workspace

  has_scope :applied, type: :boolean
  has_scope :rejected, type: :boolean
  has_scope :accepted, type: :boolean
  has_scope :completed, type: :boolean
  has_scope :reviewed, type: :boolean
  has_scope :contributors, type: :boolean

  def index
    # @mission_users = @mission_users.search(params[:q]) if params[:q]
    # @mission_users = @mission_users.available_for(current_user&.id) if params[:for_user]
    @mission_users = apply_scopes(@mission_users)
    @mission_users = @mission_users.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@mission_users) do
          Panko::ArraySerializer.new(@mission_users, each_serializer: MissionUserSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@mission_user) do
          MissionUserDetailSerializer.new.serialize(@mission_user).to_json
        end
      end
    end
  end

  def accept
    result = AcceptCandidate.call(workspace: @workspace, mission_user: @mission_user, user: current_user)
    if result.success?
      render json: MissionUserSerializer.new.serialize(result.mission_user)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  def reject
    result = RejectCandidate.call(workspace: @workspace, mission_user: @mission_user, user: current_user)
    if result.success?
      render json: MissionUserSerializer.new.serialize(result.mission_user)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  def cancel
    result = CancelMission.call(workspace: @workspace, mission_user: @mission_user, user: current_user)
    if result.success?
      render json: MissionUserSerializer.new.serialize(result.mission_user)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  def complete
    result = CompleteMission.call(workspace: @workspace, mission_user: @mission_user, user: current_user)
    if result.success?
      render json: MissionUserSerializer.new.serialize(result.mission_user)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  def review
    result = ReviewMission.call(workspace: @workspace, mission_user: @mission_user, user: current_user)
    if result.success?
      render json: MissionUserSerializer.new.serialize(result.mission_user)
    else
      render_error(result.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/mission_users/id
  def update
    if @mission_user.update(mission_user_params)
      WorkspaceHistory.track!(@workspace, @mission_user, current_user)
      render json: MissionUserSerializer.new.serialize(@mission_user)
    else
      render_error(@mission_user.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/mission_users
  def create
    @mission_user = MissionUser.new(mission_user_params)
    @mission_user.created_by = current_user&.id

    if @mission_user.save
      WorkspaceHistory.track!(@workspace, @mission_user, current_user)
      render json: MissionUserSerializer.new.serialize(@mission_user)
    else
      render_error(@mission_user.errors.messages, :unprocessable_entity)
    end
  end

  def mission_user_params
    params.require(:mission_user).permit(
      :id, :mission_id, :user_id, :status, :applied_at,
      :accepted_at, :rejected_at, :completed_at, :reviewed_at,
      :created_at, :updated_at
    )
  end

  private

  def set_workspace
    @workspace ||= @mission_user&.mission&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
