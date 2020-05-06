class Api::DiscussionsController < ApiController
  load_and_authorize_resource :workspace
  load_and_authorize_resource :mission
  load_and_authorize_resource :discussion, through: %I[mission workspace], shallow: true

  before_action :set_workspace

  # before_action :set_discussion, only: %i[show update]
  skip_before_action :authenticate_user!

  def index
    @discussions = @discussions.search(params[:q]) if params[:q]
    @discussions = @discussions.available_for(current_user&.id) if params[:for_user]
    @discussions = @discussions.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@discussions) do
          Panko::ArraySerializer.new(@discussions, each_serializer: DiscussionLightSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@discussion) do
          DiscussionSerializer.new.serialize(@discussion).to_json
        end
      end
    end
  end

  # Apply for the discussion
  # POST /api/discussions/id/apply
  # def apply
  #   application = ApplyToDiscussion.call(discussion: @discussion, user: current_user)
  #   # @discussion_user = DiscussionUser.new(discussion: @discussion, user: current_user)
  #   if application.success?
  #     # WorkspaceHistory.track!(@workspace, @discussion_user, current_user)
  #     render json: DiscussionUserSerializer.new.serialize(application.discussion_user)
  #   else
  #     render_error(application.messages, :unprocessable_entity)
  #   end
  # end

  # PATCH/PUT /api/discussions/id
  def update
    if @discussion.update(discussion_params)
      WorkspaceHistory.track!(@workspace, @discussion, current_user)
      render json: DiscussionSerializer.new.serialize(@discussion)
    else
      render_error(@discussion.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/discussions
  def create
    @discussion = Discussion.new(discussion_params)
    @discussion.user_id = current_user&.id

    if @discussion.save
      WorkspaceHistory.track!(@discussion.workspace, @discussion, current_user)
      render json: DiscussionSerializer.new.serialize(@discussion), status: :created
    else
      render_error(@discussion.errors.messages, :unprocessable_entity)
    end
  end

  def discussion_params
    params.require(:discussion).permit(
      :id,
      :name,
      :slug,
      :description,
      :visibility,
      :user_id,
      :resource_type,
      :resource_id,
      :created_at,
      :updated_at
    )
  end

  private

  def set_workspace
    @workspace ||= @discussion&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
