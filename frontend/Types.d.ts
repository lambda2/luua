type AvailableLocale = 'fr' | 'en'

type MissionVisibility = 'draft' | 'public' | 'protected' | 'hidden'
type MissionReview = 'review' | 'trusted' | 'requirements' | 'accept_all'
type MissionUserStatus = 'applied' | 'rejected' | 'accepted' | 'completed' | 'reviewed' | 'canceled'
type MissionStatus = 'open' | 'pending' | 'canceled' | 'started' | 'completed'

type SkillType = 'global' | 'organization'
type SkillCategory = 'language' | 'technical' | 'mobility'
type OrgType = 'company' | 'individual' | 'association' | 'ngo'


type NotificationCode =
    'mission.candidate.applied'     | // A candidate applied
    'mission.candidate.rejected'    | // A candidate has been rejected on a mission
    'mission.candidate.canceled'    | // A candidate has canceled a mission
    'mission.candidate.accepted'    | // A candidate has been accepted on a mission
    'mission.candidate.completed'   | // A candidate has completed a mission
    'mission.candidate.reviewed'    | // A candidate has been reviewed on a mission
    'workspace.member.joined'       | // A new member joined the workspace
    'workspace.discussion.created'  | // A new discussion is created
    'discussion.message.created'    | // A user posted a message
    'custom'                          // A custom content

type WorkspaceInvitationStatus = 'pending' | 'accepted' | 'rejected'
type WorkspaceRequestStatus = 'pending' | 'accepted' | 'rejected'
type WorkspaceMembership = 'closed' | 'approval' | 'open'

type DiscussionResourceType = 'Workspace' | 'Mission'
type MessageVoteOption = 'positive' | 'negative'

declare interface DbEntry {
    id: number
}

declare interface DbEntryWithTimestamps extends DbEntry {
    created_at: string
    updated_at: string
}

declare interface BaseUser extends DbEntryWithTimestamps {
    country: string
    email: string
    first_name: string
    image_url: string
    thumb_url: string
    last_name: string
    timezone: string
    username: string
}


declare interface User extends BaseUser {
    username: string,
    primary_workspace_id: number | null
}

declare interface AuthedUser extends User {
    admin: boolean,
    country_id: number,
    jti: string,
    provider: string | null
    token: string
    uid: string
    default_workspace: LightWorkspace | null
    workspaces: LightWorkspace[]
    user_skills: UserSkill[]
    mission_users: LightMissionUser[]
    workspace_users: WorkspaceUser[]
    workspace_requests: WorkspaceRequest[]
    jwt: string
}

declare interface GenericUser extends BaseUser {
    class_type: 'user' | 'user_info'
}

declare interface TicketWithMessages extends Ticket {
    messages: Message[]
}

declare interface Message extends DbEntryWithTimestamps {
    ticket_id: number
    content: text
    user_id: number | null
    author: GenericUser | null
    user_info_id: number | null
    message_type: string
}

declare interface LightWorkspace extends DbEntryWithTimestamps {
    name: string
    slug: string
    image_url: string
    thumb_url: string
    image: string
    description: string
    membership: WorkspaceMembership
    users_count: number
    missions_count: number
    discussions_count: number
    polls_count: number
    website: string
    region_id: number
    country_id: number
}

declare interface Workspace extends LightWorkspace {
    missions: LightMission[]
    workspace_users: WorkspaceUser[]
    organization: LightOrganization
    mission_users: LightMissionUser[]
    discussion_categories: DiscussionCategory[]
    region: Region | null
    country: Country | null
}

declare interface WorkspaceUser extends DbEntryWithTimestamps {
    workspace_id: number
    user_id: number
    admin: boolean
    role: string     
    image_url?: string
    thumb_url?: string
    first_name?: string
    last_name?: string
    username: string
    created_at: string
    workspace?: LightWorkspace
}

declare interface WorkspaceInvitation extends DbEntryWithTimestamps {
    email: string
    send_email: boolean
    status: WorkspaceInvitationStatus
    inviter_id: number
    user_id: number
    workspace_id: number
    inviter: BaseUser
    user: BaseUser
}

declare interface WorkspaceRequest extends DbEntryWithTimestamps {
    status: WorkspaceRequestStatus
    user_id: number
    workspace_id: number
    user: BaseUser
}

declare interface DiscussionCategory extends DbEntryWithTimestamps {
    workspace_id: number
    name: string
    slug: string
    icon?: string
    color?: string
    category: string
}

declare interface UserSkill extends DbEntryWithTimestamps {
    skill_id: number
    name: string
    slug: string
    level: integer
    type: SkillType
}

declare interface UserNotification extends DbEntryWithTimestamps {
    title: string
    content: string
    link: string
    resource: any
    code: NotificationCode
    viewed_at: string
}

declare interface Region extends DbEntryWithTimestamps {
    name: string
    slug: string
}
declare interface Country extends DbEntryWithTimestamps {
    name: string
    slug: string
}

declare interface Skill extends DbEntryWithTimestamps {
    name: string
    slug: string
    skill_type: SkillType
}

declare interface LightOrganization extends DbEntryWithTimestamps {
    name: string
    slug: string
    description: string
    organization_type: OrgType
    region_id: number
    country_id: number
    image: string
    color: string
    modified_at: string
}

declare interface Organization extends LightOrganization {
}

declare interface LightMissionUser extends DbEntryWithTimestamps {
    mission_id: number
    workspace_id: number
    user_id: number
    status: MissionUserStatus
    mission: LightMission
    user: BaseUser
    applied_at: string | null
    accepted_at: string | null
    rejected_at: string | null
    completed_at: string | null
    reviewed_at: string | null
    match_score: number
}

declare interface MissionUser extends LightMissionUser {
    user: BaseUser
    mission: LightMission
    mission_skills: MissionSkill[]
    user_skills: UserSkill[]
}

declare interface BaseMission extends DbEntryWithTimestamps {
    name: string
    slug: string
    description: string
    visibility: MissionVisibility
    hiring_validation: MissionReview
    discussion_id: number | null
    organization_id: number | null
    workspace_id: number
    participant_count: number
    accepted_count: number
    workspace?: LightWorkspace
    discussion: LightDiscussion | null
    image: string
    begin_at: string
    end_at: string
    due_at: string
    status: MissionStatus
    started_at: string
    completed_at: string
    canceled_at: string
    physical: boolean
    banner_image: string
    modified_at: string
}

declare interface LightMission extends BaseMission {
    skills: string[]
}

declare interface Mission extends BaseMission {
    mission_skills: MissionSkill[]
    mission_users: LightMissionUser[]
    discussions: LightDiscussion[]
}

declare interface MissionSkill extends DbEntryWithTimestamps {
    mission_id: number
    skill_id: number
    mandatory: boolean
    level: number
    name: string
    category: SkillCategory
}

declare interface MessageVote {
    user_id: number
    message_id: number
    vote: MessageVoteOption
}

declare interface Message extends DbEntryWithTimestamps {
    content: string
    user: BaseUser
    user_id: number
    parent?: Message
    parent_id: number
    discussion_id: number
    positive_vote_count: number
    negative_vote_count: number
}

declare interface LightDiscussion extends DbEntryWithTimestamps {
    name: string
    slug: string
    // description: string
    user: BaseUser
    participants: BaseUser[]
    resource_type: DiscussionResourceType
    resource_id: number
    workspace_id: number
    modified_at: string
    locked_at: string | null
    locked_by: number | null
    discussion_category: DiscussionCategory
    polls: LightPoll[]
    missions: LightMission[]
    workspace: LightWorkspace
    messages_count: number
}

declare interface DiscussionReading extends DbEntryWithTimestamps {
    user_id: number
    discussion_id: number
}

declare interface Discussion extends LightDiscussion {
    workspace: LightWorkspace
    messages: Message[]
}

type PollVisibility = 'draft' | 'hidden' | 'protected' | 'public'
type PollAnonymity = 'open' | 'anonymous' | 'not_anonymous'
type PollReveal = 'on_close' | 'on_vote' | 'always'
type PollAuthentication = 'required' | 'not_required'
type PollType = 'single_choice'

declare interface LightPoll extends DbEntryWithTimestamps {
    name: string
    slug: string
    category: number // @TODO
    description: string | null
    begin_at: string | null
    end_at: string | null
    closed_at: string | null
    closed_by: number | null
    anonymity: PollAnonymity
    authentication: PollAuthentication
    poll_type: PollType
    visibility: PollVisibility
    reveal: PollReveal
    user_id: number
    user: BaseUser
    discussion_category_id: number | null
    discussion_category?: DiscussionCategory
    workspace_id: number
    discussion_id: number | null
    vote_count: number
}

declare interface PollOption extends DbEntryWithTimestamps {
    name: string
    slug: string
    vote_count?: number
    description: string | null
}

declare interface UserVote extends DbEntryWithTimestamps {
    poll_option: PollOption
    poll: LightPoll
    user: BaseUser
}

declare interface LightUserVote extends DbEntryWithTimestamps {
    poll_option_id: number
    poll_id: number
    user: BaseUser
}

declare interface VoteResults {
    poll_options: PollOption[]
    user_votes: LightUserVote[]
}

declare interface Poll extends LightPoll {
    workspace?: LightWorkspace
    discussion?: LightDiscussion
    discussion_category?: DiscussionCategory
    poll_options: PollOption[]
}



declare module 'parse-link-header';