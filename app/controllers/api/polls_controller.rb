class Api::PollsController < ApiController
  load_and_authorize_resource :workspace
  load_and_authorize_resource :poll, through: :workspace, shallow: true

  before_action :set_workspace

  # before_action :set_poll, only: %i[show update]
  skip_before_action :authenticate_user!

  def index
    # @polls = @polls.search(params[:q]) if params[:q]
    # @polls = @polls.available_for(current_user&.id) if params[:for_user]
    @polls = @polls.order(order_params)
    @polls = @polls.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@polls) do
          Panko::ArraySerializer.new(@polls, each_serializer: PollLightSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@poll) do
          PollSerializer.new.serialize(@poll).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/polls/id
  def update
    if @poll.update(poll_params)
      WorkspaceHistory.track!(@workspace, @poll, current_user)
      render json: PollSerializer.new.serialize(@poll)
    else
      render_error(@poll.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/polls
  # @TODO interactor
  def create
    @poll = Poll.new(poll_params)
    @poll.user_id = current_user&.id
    @poll.workspace = @workspace if @workspace

    if @poll.save
      WorkspaceHistory.track!(@workspace, @poll, current_user)
      if @poll.discussion
        Message.create_bot_message(
          discussion: @poll.discussion,
          event_type: :poll_created,
          resource: @poll,
          user_id: @poll.user_id,
          content: I18n.t('messages.system.poll.created', username: current_user.username)
        )
      end
      render json: PollSerializer.new.serialize(@poll), status: :created
    else
      render_error(@poll.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/polls/:id/vote
  def vote
    vote = Vote.call(
      poll_option_id: vote_params[:poll_option_id],
      user: current_user,
      poll: @poll
    )

    if vote.success?
      render json: UserVoteSerializer.new.serialize(vote.user_vote), status: :created
    else
      render_error(vote.messages, :unprocessable_entity)
    end
  end

  # PATCH /api/polls/:id/vote
  # @TODO interactor
  def close
    if @poll.close!
      WorkspaceHistory.track!(@workspace, @poll, current_user)
      # if @poll.discussion
      #   Message.create_bot_message(
      #     discussion: @poll.discussion,
      #     event_type: :poll_closed,
      #     resource: @poll,
      #     content: I18n.t('messages.system.poll.closed', username: current_user.username)
      #   )
      # end

      render json: PollSerializer.new.serialize(@poll)
    else
      render_error(@poll.errors.messages, :unprocessable_entity)
    end
  end

  # GET /api/polls/:id/results
  def results
    authorize! :show, @poll

    uv = @poll.user_votes_results(current_user)
    render json: Panko::Response.new(
      poll_options: Panko::ArraySerializer.new(@poll.poll_options, each_serializer: PollOptionResultSerializer),
      user_votes: Panko::ArraySerializer.new(uv, each_serializer: UserVoteLightSerializer)
    )
  end

  # DELETE /api/polls/id
  def destroy
    @poll.destroy!
    WorkspaceHistory.track!(@workspace, @poll, current_user)
    render_destroyed
  end

  def poll_params
    params.require(:poll).permit(
      :id,
      :anonymity,
      :authentication,
      :begin_at,
      :category,
      :description,
      :end_at,
      :locked_at,
      :locked_by,
      :name,
      :reveal,
      :poll_type,
      :slug,
      :visibility,
      :created_at,
      :updated_at,
      :discussion_category_id,
      :discussion_id,
      :user_id,
      :workspace_id,
      poll_options_attributes: %i[id name icon description _destroy]
    )
  end

  def vote_params
    params.require(:user_vote).permit(
      :poll_option_id
    )
  end

  private

  def set_workspace
    @workspace ||= @poll&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end

  def order_params
    return { updated_at: :desc } unless params[:order]

    params[:order].split(',').reject(&:blank?).map do |o|
      [o.gsub('-', '').to_sym, o.first == '-' ? :desc : :asc]
    end.to_h
  end
end
