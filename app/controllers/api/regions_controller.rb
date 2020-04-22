class Api::RegionsController < ApiController
  load_and_authorize_resource

  def index
    @regions = @regions.page(params[:page])
    # @regions = @regions.search(params[:q]) if params[:q]

    respond_to do |format|
      format.json do
        respond_with_cache(@regions) do
          Panko::ArraySerializer.new(@regions, each_serializer: RegionSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@region) do
          RegionSerializer.new.serialize(@region).to_json
        end
      end
    end
  end
end
