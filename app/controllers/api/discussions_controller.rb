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
    @discussions = @discussions.unread(current_user&.id) if params[:unread]
    @discussions = @discussions.regular
    @discussions = @discussions.order(order_params)
    # @discussions = @discussions.page(params[:page])
    @discussions = paginate(@discussions)

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
    publish = PublishDiscussion.call(discussion_params: discussion_params, user: current_user)

    if publish.success?
      render json: DiscussionSerializer.new.serialize(publish.discussion), status: :created
    else
      render_error(publish.messages, :unprocessable_entity)
    end
  end

  # DELETE /api/discussions/id
  def destroy
    @discussion.destroy!
    render_destroyed
  end

  # PATCH /api/discussions/id/lock
  def lock
    @discussion.lock!(current_user)
    render json: DiscussionSerializer.new.serialize(@discussion)
  end

  def update_reading
    @discussion_reading = DiscussionReading.where(
      discussion: @discussion, user: current_user
    ).first_or_create
    @discussion_reading.update_columns(updated_at: params[:ts] || Time.zone.now)

    render json: DiscussionReadingSerializer.new.serialize(@discussion_reading)
  end

  def discussion_params
    params.require(:discussion).permit(
      :id,
      :name,
      :slug,
      :description,
      :visibility,
      :user_id,
      :discussion_category_id,
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

  def order_params
    return { modified_at: :desc, updated_at: :desc } unless params[:order]

    params[:order].split(',').reject(&:blank?).map do |o|
      [o.gsub('-', '').to_sym, o.first == '-' ? :desc : :asc]
    end.to_h
  end
end
