class Api::CountriesController < ApiController
  load_and_authorize_resource

  def index
    @countries = @countries # .page(params[:page])
    @countries = @countries.where(region_id: params[:region_id]) if params[:region_id]

    respond_to do |format|
      format.json do
        respond_with_cache(@countries) do
          @countries.map {|t| { id: t.id, name: t.name } }
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@country) do
          CountrySerializer.new.serialize(@country).to_json
        end
      end
    end
  end

end
