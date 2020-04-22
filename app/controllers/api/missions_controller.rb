class Api::MissionsController < ApiController
  load_and_authorize_resource :workspace
  load_and_authorize_resource :mission, through: :workspace, shallow: true

  before_action :set_workspace

  # before_action :set_mission, only: %i[show update]
  skip_before_action :authenticate_user!

  def index
    @missions = @missions.search(params[:q]) if params[:q]
    @missions = @missions.available_for(current_user&.id) if params[:for_user]
    @missions = @missions.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@missions) do
          Panko::ArraySerializer.new(@missions, each_serializer: MissionLightSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@mission) do
          MissionSerializer.new.serialize(@mission).to_json
        end
      end
    end
  end

  # Apply for the mission
  # POST /api/missions/id/apply
  def apply
    @mission_user = MissionUser.new(mission: @mission, user: current_user)
    if @mission_user.save
      WorkspaceHistory.track!(@workspace, @mission_user, current_user)
      render json: MissionUserSerializer.new.serialize(@mission_user)
    else
      render_error(@mission_user.errors.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/missions/id
  def update
    if @mission.update(mission_params)
      WorkspaceHistory.track!(@workspace, @mission, current_user)
      render json: MissionSerializer.new.serialize(@mission)
    else
      render_error(@mission.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/missions
  def create
    @mission = Mission.new(mission_params)
    @mission.created_by = current_user&.id

    if @mission.save
      WorkspaceHistory.track!(@workspace, @mission, current_user)
      render json: MissionSerializer.new.serialize(@mission)
    else
      render_error(@mission.errors.messages, :unprocessable_entity)
    end
  end

  def mission_params
    params.require(:mission).permit(
      :name,
      :mission_category_id,
      :physical,
      :description,
      :begin_at,
      :end_at,
      :due_at,
      :organization_id,
      :workspace_id,
      :image,
      :banner_image,
      :modified_at,
      :modified_by,
      :participant_count,
      :hiring_validation,
      mission_skills_attributes: %i[id skill_id level name mandatory _destroy]
    )
  end

  private

  def set_workspace
    @workspace ||= @mission&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
