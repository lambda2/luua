type AvailableLocale = 'fr' | 'en'
type MissionVisibility = 'draft' | 'public' | 'protected' | 'hidden'
type MissionReview = 'review' | 'trusted' | 'requirements' | 'accept_all'
type SkillType = 'global' | 'organization'
type SkillCategory = 'language' | 'technical' | 'mobility'
type OrgType = 'company' | 'individual' | 'association' | 'ngo'
type MissionUserStatus = 'applied' | 'rejected' | 'accepted' | 'completed' | 'reviewed'
type NotificationCode =
    'mission.candidate.applied'     | // A candidate applied
    'mission.candidate.rejected'    | // A candidate has been rejected on a mission
    'mission.candidate.canceled'    | // A candidate has canceled a mission
    'mission.candidate.accepted'    | // A candidate has been accepted on a mission
    'mission.candidate.completed'   | // A candidate has completed a mission
    'mission.candidate.reviewed'    | // A candidate has been reviewed on a mission
    'custom'                          // A custom content

declare interface BaseUser {
    id: number
    country: string
    email: string
    first_name: string
    image_url: string
    thumb_url: string
    last_name: string
    timezone: string
    username: string
    created_at: string
    updated_at: string
}


declare interface User extends BaseUser {
    username: string,
    primary_workspace_id: number | null
}

declare interface AuthedUser extends User {
    admin: boolean,
    jti: string,
    provider: string | null
    token: string
    uid: string
    default_workspace: LightWorkspace | null
    workspaces: LightWorkspace[]
    user_skills: UserSkill[]
    mission_users: LightMissionUser[]
    workspaces_users: WorkspaceUser[]
    jwt: string
}

declare interface GenericUser extends BaseUser {
    class_type: 'user' | 'user_info'
}

declare interface TicketWithMessages extends Ticket {
    messages: Message[]
}

declare interface Message {
    id: number
    ticket_id: number
    content: text
    user_id: number | null
    author: GenericUser | null
    user_info_id: number | null
    message_type: string
    created_at: string
    updated_at: string
}

declare interface LightWorkspace {
    id: number
    name: string
    slug: string
    image_url: string
    thumb_url: string
    image: string
    users_count: number
    missions_count: number
    // workspace_type: 'main' | 'company' | 'personal'
    created_at: string
    updated_at: string
}

declare interface WorkspaceUser {
    id: number
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
}

declare interface Workspace extends LightWorkspace {
    missions: LightMission[]
    workspaces_users: WorkspaceUser[]
    organization: LightOrganization
    mission_users: LightMissionUser[]
}

declare interface UserSkill {
    id: number
    skill_id: number
    name: string
    slug: string
    level: integer
    type: SkillType
}

declare interface UserNotification {
    id: number
    title: string
    content: string
    link: string
    resource: any
    code: NotificationCode
    viewed_at: string
    created_at: string
    updated_at: string
}

declare interface Region {
    id: number
    name: string
    slug: string
}
declare interface Country {
    id: number
    name: string
    slug: string
}

declare interface Skill {
    id: number
    name: string
    slug: string
    skill_type: SkillType
}

declare interface LightOrganization {
    id: number
    name: string
    slug: string
    description: string
    organization_type: OrgType
    region_id: number
    country_id: number
    image: string
    color: string
    modified_at: string
    created_at: string
    updated_at: string
}
declare interface Organization extends LightOrganization {
}

declare interface LightMissionUser {
    id: number
    mission_id: number
    workspace_id: number
    user_id: number
    status: MissionUserStatus
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

declare interface LightMission {
    id: number
    name: string
    slug: string
    description: string
    visibility: MissionVisibility
    hiring_validation: MissionReview
    organization_id: number
    workspace_id: number
    participant_count: number
    workspace?: LightWorkspace
    image: string
    begin_at: string
    end_at: string
    due_at: string
    physical: boolean
    skills: string[]
    banner_image: string
    modified_at: string
    created_at: string
    updated_at: string
}

declare interface MissionSkill {
    id: number
    mission_id: number
    skill_id: number
    mandatory: boolean
    level: number
    name: string
    category: SkillCategory
}

declare interface Mission extends LightMission {
    mission_skills: MissionSkill[]
}
