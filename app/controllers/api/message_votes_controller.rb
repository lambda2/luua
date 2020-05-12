class Api::MessageVotesController < ApiController
  load_and_authorize_resource :message
  load_and_authorize_resource :message_vote, through: :message, shallow: true

  # def index
  #   @message_votes = @message_votes.search(params[:q]) if params[:q]
  #   @message_votes = @message_votes.order(popularity: :desc).page(params[:page])

  #   respond_to do |format|
  #     format.json do
  #       respond_with_cache(@message_votes) do
  #         @message_votes.map {|t| { id: t.id, name: t.name } }
  #       end
  #     end
  #   end

  # end

  def mines
    @message_votes = @message_votes.where(user_id: current_user.id)

    respond_to do |format|
      format.json do
        respond_with_cache(@message_votes) do
          Panko::ArraySerializer.new(@message_votes, each_serializer: MessageVoteSerializer).to_json
        end
      end
    end

  end
end
