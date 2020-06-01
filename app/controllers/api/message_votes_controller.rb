class Api::MessageVotesController < ApiController
  load_and_authorize_resource :message
  load_and_authorize_resource :discussion
  load_and_authorize_resource :workspace
  load_and_authorize_resource :message_vote, through: %i[message discussion workspace], shallow: true

  has_scope :only_roots, type: :boolean

  def mines
    @message_votes = apply_scopes(@message_votes).where(user_id: current_user.id)

    respond_to do |format|
      format.json do
        respond_with_cache(@message_votes) do
          Panko::ArraySerializer.new(@message_votes, each_serializer: MessageVoteSerializer).to_json
        end
      end
    end
  end
end
