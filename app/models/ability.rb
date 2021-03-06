# frozen_string_literal: true

class Ability
  include CanCan::Ability

  # For admins
  def admin_ability(_user)
    can :manage, :all
  end

  # For normal authed users
  # rubocop:todo Metrics/MethodLength
  def regular_ability(user) # rubocop:todo Metrics/AbcSize Metrics/MethodLength # rubocop:todo Metrics/MethodLength # rubocop:todo Metrics/MethodLength
    can :manage, User, id: user.id
    can :read, User
    can :read, Skill, skill_type: :global
    can :read, Skill, skill_type: :organization, organization: { id: user.organization_ids }

    # ========= Missions ============

    # Workspace admins can see everything
    can :read, Mission, visibility: %i[hidden draft], workspace: { id: user.admin_workspace_ids }
    can :read, Mission, visibility: %i[hidden draft], created_by: user.id

    # Workspace members can see protected
    can :read, Mission, visibility: :protected, workspace: { id: user.workspace_ids }

    can %i[create], Mission, workspace: { id: user.workspace_ids }
    can %i[create update destroy], Mission, workspace: { id: user.admin_workspace_ids }
    can %i[create update destroy], Mission, created_by: user.id

    can %i[manage], MissionUser, mission: { workspace: { id: user.admin_workspace_ids } }
    can %i[complete reject], MissionUser, user_id: user.id
    can %i[read], MissionUser, user_id: user.id
    can %i[read], MissionUser, mission: { workspace: { id: user.workspace_ids } }

    can %i[apply], Mission

    can %i[read read! me read_all], Notification, user_id: user.id

    # ========= Workspaces ============

    can %i[read categories], Workspace
    can :me, Workspace, id: user.workspace_ids
    can :manage, Workspace, id: user.admin_workspace_ids
    can :create, Workspace
    can [:join], Workspace, membership: %i[open approval]

    can :read, WorkspaceUser
    can :manage, WorkspaceUser, workspace_id: user.admin_workspace_ids

    can :read, WorkspaceInvitation, workspace_id: user.workspace_ids
    can %i[create update destroy], WorkspaceInvitation, workspace_id: user.admin_workspace_ids
    can %i[accept reject], WorkspaceInvitation, user_id: user.id

    can :read, WorkspaceRequest, workspace_id: user.workspace_ids
    can :read, WorkspaceRequest, user_id: user.id
    can :manage, WorkspaceRequest, workspace_id: user.admin_workspace_ids

    can :create, Organization

    # ========= Discussions ============

    can :read, Discussion
    can :create, Discussion, resource_type: 'Workspace', resource_id: user.workspace_ids
    can :update_reading, Discussion, visibility: :public
    can :update_reading, Discussion, resource_type: 'Workspace', resource_id: user.workspace_ids
    can :manage, Discussion, user_id: user.id
    can :manage, Discussion, resource_type: 'Mission', resource: { workspace_id: user.admin_workspace_ids }
    can :manage, Discussion, resource_type: 'Workspace', resource_id: user.admin_workspace_ids

    can :read, DiscussionReading, resource_type: 'Workspace', resource_id: user.workspace_ids
    can :create, DiscussionReading, user_id: user.id
    can :manage, DiscussionReading, user_id: user.id

    can %i[show index], Message
    can :create, Message, discussion: { user_id: user.id }
    can :create, Message, discussion: { resource_type: 'Workspace', resource_id: user.workspace_ids }
    can :create, Message, discussion: { resource_type: 'Mission', resource: { workspace_id: user.workspace_ids } }
    can :create, Message, discussion: { resource_type: 'Mission', resource: { visibility: :public } }
    can :vote, Message
    can %i[update destroy], Message, user_id: user.id
    can [:destroy], Message, discussion: { resource_type: 'Mission', resource: { workspace_id: user.admin_workspace_ids } }
    can [:destroy], Message, discussion: { resource_type: 'Workspace', resource_id: user.admin_workspace_ids }

    can [:mines], MessageVote
    can [:create], MessageVote # @TODO restrict this
    can %i[update destroy], MessageVote, user_id: user.id

    can %i[read], DiscussionCategory
    can %i[manage], DiscussionCategory, workspace: { id: user.admin_workspace_ids }

    # ========= Polls ============

    # Workspace admins can see hidden polls
    can %i[vote read], Poll, visibility: %i[hidden], workspace: { id: user.admin_workspace_ids }
    can :read, Poll, visibility: %i[hidden draft], user_id: user.id

    # Workspace members can see protected
    can %i[vote read], Poll, visibility: :protected, workspace: { id: user.workspace_ids }

    can :vote, Poll, visibility: :public, authentication: :required

    can :results, Poll, reveal: :always
    can :results, Poll do |poll|
      puts "Can result ? #{(poll.on_vote_reveal? && poll.user_votes.where(user_id: user&.id).any?)} || #{(poll.on_close_reveal? && poll.closed?)}"
      (poll.on_vote_reveal? && poll.user_votes.where(user_id: user&.id).any?) ||
        (poll.on_close_reveal? && poll.closed?)
    end

    can %i[create], Poll, workspace: { id: user.workspace_ids }
    can %i[create update destroy close], Poll, workspace: { id: user.admin_workspace_ids }
    can %i[create update destroy close], Poll, user_id: user.id
    can :read, PollOption
    can %i[create update destroy], PollOption, poll: { user_id: user.id }

    can [:mines], UserVote
  end
  # rubocop:enable Metrics/MethodLength

  # For normal authed users
  def guest_ability
    can :read, Organization
    can :read, Country
    can :read, Region
    can :read, SkillCategory
    can :read, User
    can :search, User
    can :read, Discussion
    can :read, DiscussionCategory
    can :read, Message
    can %i[read], MissionUser, mission: { visibility: :public }
    can %i[read], WorkspaceUser

    # Everybody can see public missions
    can :read, Mission, visibility: :public
    can :read, Poll, visibility: :public
    can :read, PollOption, poll: { visibility: :public }
    can :vote, Poll, visibility: :public, authentication: :not_required

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
