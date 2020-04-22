# typed: false
class Api::TicketsController < ApiController

  load_and_authorize_resource :workspace
  load_and_authorize_resource through: :workspace, shallow: true

  def index
    # puts Article.accessible_by(current_ability).count == Article.count
    respond_with_cache(@tickets.page(params[:page])) do
      Panko::ArraySerializer.new(@tickets.page(params[:page]), each_serializer: TicketSerializer).to_json
    end
  end

  def show
    # @ticket = Ticket.find(params[:id])
    respond_with_cache(@ticket) do
      TicketWithMessagesSerializer.new({}).serialize(@ticket)
    end
  end

  def reply
    puts 'Replying to ticket !'
    puts params.inspect
    content = message_params[:content]
    author = User.find(message_params[:user_id])
    @ticket.add_message(content, author)
    respond_with_cache(@ticket) do
      TicketWithMessagesSerializer.new({}).serialize(@ticket)
    end
  end

  private

  # Using a private method to encapsulate the permissible parameters
  # is just a good pattern since you'll be able to reuse the same
  # permit list between create and update. Also, you can specialize
  # this method with per-user checking of permissible attributes.
  def message_params
    params.require(:message).permit(:content, :user_id)
  end

end
