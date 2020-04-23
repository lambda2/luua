# frozen_string_literal: true

class Ability
  include CanCan::Ability

  # For admins
  def admin_ability(_user)
    can :manage, :all
  end

  # For normal authed users
  def regular_ability(user)
    can :manage, User, id: user.id
    can :read, Skill, skill_type: :global
    can :read, Skill, skill_type: :organization, organization: { id: user.organization_ids }

    # Workspace admins can see everything
    can :read, Mission, visibility: %i[hidden draft], workspace: { id: user.admin_workspace_ids }
    can :read, Mission, visibility: %i[hidden draft], created_by: user.id

    # Workspace members can see protected
    can :read, Mission, visibility: :protected, workspace: { id: user.workspace_ids }

    can %i[create update destroy], Mission, workspace: { id: user.admin_workspace_ids }
    can %i[create update destroy], Mission, created_by: user.id

    can %i[manage], MissionUser, mission: { workspace: { id: user.admin_workspace_ids } }
    can %i[complete reject], MissionUser, user_id: user.id
    can %i[read], MissionUser, user_id: user.id

    can %i[apply], Mission

    can :read, Workspace
    can :manage, Workspace, id: user.admin_workspace_ids
    can :create, Workspace

    can :create, Organization
  end

  # For normal authed users
  def guest_ability
    can :read, Organization
    can :read, Country
    can :read, Region
    can :read, SkillCategory

    # Everybody can see public missions
    can :read, Mission, visibility: :public
    can :read, Workspace
  end

  def initialize(user)
    # Define abilities for the passed in user here. For example:

    # If no user, you cant do anything
    if user.present?

      regular_ability(user)

      admin_ability(user) if user.admin? # additional permissions for administrators
    end

    guest_ability

    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
