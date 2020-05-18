class Api::PollsController < ApiController
  load_and_authorize_resource :workspace
  load_and_authorize_resource :poll, through: :workspace, shallow: true

  before_action :set_workspace

  # before_action :set_poll, only: %i[show update]
  skip_before_action :authenticate_user!

  def index
    # @polls = @polls.search(params[:q]) if params[:q]
    # @polls = @polls.available_for(current_user&.id) if params[:for_user]
    @polls = @polls.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@polls) do
          Panko::ArraySerializer.new(@polls, each_serializer: MissionLightSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@poll) do
          MissionSerializer.new.serialize(@poll).to_json
        end
      end
    end
  end

  # Apply for the poll
  # POST /api/polls/id/apply
  def apply
    application = ApplyToMission.call(poll: @poll, user: current_user)
    if application.success?
      render json: MissionUserSerializer.new.serialize(application.poll_user)
    else
      render_error(application.messages, :unprocessable_entity)
    end
  end

  # PATCH/PUT /api/polls/id
  def update
    if @poll.update(poll_params)
      WorkspaceHistory.track!(@workspace, @poll, current_user)
      render json: MissionSerializer.new.serialize(@poll)
    else
      render_error(@poll.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/polls
  def create
    @poll = Mission.new(poll_params)
    @poll.created_by = current_user&.id
    @poll.workspace = @workspace if @workspace

    if @poll.save
      WorkspaceHistory.track!(@workspace, @poll, current_user)
      Discussion.create(resource: @poll, name: @poll.name, user: current_user)
      render json: MissionSerializer.new.serialize(@poll), status: :created
    else
      render_error(@poll.errors.messages, :unprocessable_entity)
    end
  end

  def poll_params
    params.require(:poll).permit(
      :name,
      :poll_category_id,
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
      :visibility,
      poll_skills_attributes: %i[id skill_id level name mandatory _destroy]
    )
  end

  private

  def set_workspace
    @workspace ||= @poll&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
