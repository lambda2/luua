class Api::OrganizationsController < ApiController
  # load_and_authorize_resource
  # # before_action :set_organization, only: %i[show update]
  # skip_before_action :authenticate_user!

  # def index
  #   @organizations = @organizations.search(params[:q]) if params[:q]
  #   @organizations = @organizations.page(params[:page])

  #   respond_to do |format|
  #     format.json do
  #       respond_with_cache(@organizations) do
  #         Panko::ArraySerializer.new(@organizations, each_serializer: OrganizationLightSerializer).to_json
  #       end
  #     end
  #   end
  # end

  # def show
  #   respond_to do |format|
  #     format.json do
  #       respond_with_cache(@organization) do
  #         OrganizationSerializer.new.serialize(@organization).to_json
  #       end
  #     end
  #   end
  # end

  # # PATCH/PUT /api/organizations/id
  # def update
  #   if @organization.update(organization_params)
  #     render json: OrganizationSerializer.new.serialize(@organization)
  #   else
  #     render_error(@organization.errors.messages, :unprocessable_entity)
  #   end
  # end

  # # POST /api/organizations
  # def create
  #   @organization = Organization.new(organization_params)
  #   if @organization.save
  #     render json: OrganizationSerializer.new.serialize(@organization)
  #   else
  #     render_error(@organization.errors.messages, :unprocessable_entity)
  #   end
  # end

  # def organization_params
  #   params.require(:organization).permit(
  #     :name,
  #     :description,
  #     :region_id,
  #     :country_id,
  #     :organization_type,
  #     :image,
  #     :color
  #   )
  # end

  # # Use callbacks to share common setup or constraints between actions.
  # # def set_organization
  # #   @organization = Organization.friendly.find(params[:id])
  # # end
end
