class Api::SkillsController < ApiController
  load_and_authorize_resource :skill_category
  load_and_authorize_resource :skill, through: :skill_category, shallow: true

  def index
    @skills = @skills.search(params[:q]) if params[:q]
    @skills = @skills.order(popularity: :desc).page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@skills) do
          @skills.map {|t| { id: t.id, name: t.name } }
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@skill) do
          skillSerializer.new.serialize(@skill).to_json
        end
      end
    end
  end
end
