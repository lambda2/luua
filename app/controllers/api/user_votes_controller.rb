class Api::UserVotesController < ApiController
  load_and_authorize_resource :poll
  load_and_authorize_resource :user_vote, through: :poll, shallow: true

  # def index
  #   @user_votes = @user_votes.search(params[:q]) if params[:q]
  #   @user_votes = @user_votes.order(popularity: :desc).page(params[:page])

  #   respond_to do |format|
  #     format.json do
  #       respond_with_cache(@user_votes) do
  #         @user_votes.map {|t| { id: t.id, name: t.name } }
  #       end
  #     end
  #   end

  # end

  def mines
    @user_votes = @user_votes.where(user_id: current_user.id)

    respond_to do |format|
      format.json do
        respond_with_cache(@user_votes) do
          Panko::ArraySerializer.new(@user_votes, each_serializer: UserVoteSerializer).to_json
        end
      end
    end
  end
end
