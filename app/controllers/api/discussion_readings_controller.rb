class Api::DiscussionReadingsController < ApiController
  load_and_authorize_resource :discussion
  load_and_authorize_resource :workspace
  load_and_authorize_resource :discussion_reading, through: %i[discussion workspace], shallow: true

  def index
    respond_to do |format|
      format.json do
        respond_with_cache(@discussion_readings) do
          Panko::ArraySerializer.new(@discussion_readings, each_serializer: DiscussionReadingSerializer).to_json
        end
      end
    end
  end

  def mines
    @discussion_readings = @discussion_readings.where(user_id: current_user.id)

    respond_to do |format|
      format.json do
        respond_with_cache(@discussion_readings) do
          Panko::ArraySerializer.new(@discussion_readings, each_serializer: DiscussionReadingSerializer).to_json
        end
      end
    end
  end

end
