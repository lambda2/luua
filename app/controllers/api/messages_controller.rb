class Api::MessagesController < ApiController
  load_and_authorize_resource :discussion
  load_and_authorize_resource :message, through: %I[discussion], shallow: true

  before_action :set_discussion

  skip_before_action :authenticate_user!

  def index
    @messages = @messages.search(params[:q]) if params[:q]
    @messages = @messages.available_for(current_user&.id) if params[:for_user]
    @messages = @messages.order(created_at: :asc)
    @messages = paginate(@messages, per_page: 100)

    respond_to do |format|
      format.json do
        respond_with_cache(@messages) do
          Panko::ArraySerializer.new(@messages, each_serializer: MessageSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@message) do
          MessageSerializer.new.serialize(@message).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/messages/id
  def update
    if @message.update(message_params)
      render json: MessageSerializer.new.serialize(@message)
    else
      render_error(@message.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/messages
  def create
    publish = PostMessage.call(message_params: message_params, user: current_user)

    if publish.success?
      render json: MessageSerializer.new.serialize(publish.message), status: :created
    else
      render_error(publish.messages, :unprocessable_entity)
    end
  end

  # POST /api/messages/:id/vote
  # @TODO do an interactor here
  def vote
    actual_vote = vote_params
    puts "actual_vote -> #{actual_vote.inspect}"
    existing = MessageVote.find_by(user_id: current_user.id, message_id: @message.id)
    puts "existing -> #{existing.inspect}"

    if existing && existing.vote == actual_vote[:vote]
      existing.destroy
      render_destroyed
    elsif existing && existing.vote != actual_vote[:vote]
      existing.update(actual_vote)
      render json: MessageVoteSerializer.new.serialize(existing), status: :ok
    else
      existing = MessageVote.create(vote: actual_vote[:vote], user_id: current_user.id, message_id: @message.id)
      puts existing.errors.messages
      render json: MessageVoteSerializer.new.serialize(existing), status: :created
    end
  end

  # DELETE /api/messages/id
  def destroy
    @message.destroy!
    render_destroyed
  end

  def message_params
    params.require(:message).permit(
      :id,
      :content,
      :serialized_content,
      :parent_id,
      :discussion_id
    )
  end

  def vote_params
    params.require(:message_vote).permit(
      :vote
    )
  end

  private

  def set_discussion
    @discussion ||= @message&.discussion # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
