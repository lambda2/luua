class Api::MessagesController < ApiController
  load_and_authorize_resource :discussion
  load_and_authorize_resource :message, through: %I[discussion], shallow: true

  before_action :set_discussion

  skip_before_action :authenticate_user!

  def index
    puts "<><><><><><><><>"
    @messages = @messages.search(params[:q]) if params[:q]
    @messages = @messages.available_for(current_user&.id) if params[:for_user]
    @messages = @messages.order(created_at: :asc)
    @messages = paginate(@messages)
    puts "<><><><><><><><>"
    
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
    @message = Message.new(message_params)
    @message.user = current_user

    if @message.save
      # WorkspaceHistory.track!(@discussion, @message, current_user)
      render json: MessageSerializer.new.serialize(@message), status: :created
    else
      render_error(@message.errors.messages, :unprocessable_entity)
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
      :parent_id,
      :discussion_id
    )
  end

  private

  def set_discussion
    @discussion ||= @message&.discussion # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
