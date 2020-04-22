class Api::MissionSkillsController < ApiController
  load_and_authorize_resource :mission
  load_and_authorize_resource :mission_skill, through: :mission, shallow: true

  # before_action :set_mission_skill, only: %i[show update]
  skip_before_action :authenticate_user!

  def index
    # @mission_skills = @mission_skills.search(params[:q]) if params[:q]
    @mission_skills = @mission_skills.page(params[:page])

    respond_to do |format|
      format.json do
        respond_with_cache(@mission_skills) do
          Panko::ArraySerializer.new(@mission_skills, each_serializer: MissionSkillLightSerializer).to_json
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        respond_with_cache(@mission_skill) do
          MissionSkillSerializer.new.serialize(@mission_skill).to_json
        end
      end
    end
  end

  # PATCH/PUT /api/mission_skills/id
  def update
    if @mission_skill.update(mission_skill_params)
      render json: MissionSkillSerializer.new.serialize(@mission_skill)
    else
      render_error(@mission_skill.errors.messages, :unprocessable_entity)
    end
  end

  # POST /api/mission_skills
  def create
    @mission_skill = MissionSkill.new(mission_skill_params)
    @mission_skill.created_by = current_user&.id

    if @mission_skill.save
      render json: MissionSkillSerializer.new.serialize(@mission_skill)
    else
      render_error(@mission_skill.errors.messages, :unprocessable_entity)
    end
  end

  def mission_skill_params
    params.require(:mission_skill).permit(
      :id,
      :skill_id,
      :mission_id,
      :level,
      :mandatory
    )
  end

  private # rubocop:todo Lint/UselessAccessModifier

  # Use callbacks to share common setup or constraints between actions.
  # def set_mission_skill
  #   @mission_skill = MissionSkill.friendly.find(params[:id])
  # end
end
