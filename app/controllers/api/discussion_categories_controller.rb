class Api::DiscussionCategoriesController < ApiController

  load_and_authorize_resource :workspace
  load_and_authorize_resource :discussion_category, through: %i[workspace], shallow: true

  skip_before_action :authenticate_user!

  before_action :set_workspace

  def index
    @discussion_categories = @discussion_categories
      .order(created_at: :asc)
      .page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@discussion_categories) do
          Panko::ArraySerializer.new(@discussion_categories, each_serializer: DiscussionCategorySerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@discussion_category) do
          DiscussionCategorySerializer.new.serialize(@discussion_category).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/discussion_categories/id
  def update
    if @discussion_category.update(discussion_category_params)
      # WorkspaceHistory.track!(@workspace, @discussion_category, current_user)
      render json: DiscussionCategorySerializer.new.serialize(@discussion_category)
    else
      render_error(@discussion_category.errors.messages, :unprocessable_entity)
    end
  end

  # DELETE /api/discussion_categories/id
  def destroy
    @discussion_category.destroy!
    render_destroyed
  end

  # POST /api/discussion_categories
  def create
    @discussion_category = DiscussionCategory.new(discussion_category_params)
    @discussion_category.workspace = @workspace if @workspace

    if @discussion_category.save
      # WorkspaceHistory.track!(@workspace, @discussion_category, current_user)
      render json: DiscussionCategorySerializer.new.serialize(@discussion_category)
    else
      render_error(@discussion_category.errors.messages, :unprocessable_entity)
    end
  end

  def discussion_category_params
    params.require(:discussion_category).permit(
      :id,
      :name,
      :icon,
      :color,
      :category
    )
  end

  private

  def set_workspace
    @workspace ||= @discussion_category&.workspace # rubocop:todo Naming/MemoizedInstanceVariableName
  end
end
