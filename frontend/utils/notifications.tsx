import ROUTES from "../routes/routes"


/**
 * Returns the proper link for a given notification
 */
export const linkForNotification = ({
  resource,
  link,
  code
}: { resource: any, link: string, code: NotificationCode }) => {

  switch (code) {
    case 'mission.candidate.applied':
      return ROUTES.manage.workspace.candidates.show(resource.workspace_id, resource.id)
    case 'mission.candidate.rejected':
      return ROUTES.manage.workspace.missions.show(resource.workspace_id, resource.mission_id)
    case 'mission.candidate.canceled':
      return ROUTES.manage.workspace.candidates.show(resource.workspace_id, resource.id)
    case 'mission.candidate.accepted':
      return ROUTES.manage.workspace.missions.show(resource.workspace_id, resource.mission_id)
    case 'mission.candidate.completed':
      return ROUTES.manage.workspace.candidates.show(resource.workspace_id, resource.id)
    case 'mission.candidate.reviewed':
      return ROUTES.manage.workspace.missions.show(resource.workspace_id, resource.mission_id)
    case 'workspace.member.joined':
      return ROUTES.manage.workspace.members(resource.workspace_id)
    case 'workspace.discussion.created':
      return ROUTES.manage.workspace.discussions.show(resource.workspace_id, resource.id)
    case 'discussion.message.created':
      return ROUTES.manage.workspace.discussions.show(resource.workspace_id, resource.discussion_id)
    default:
      console.warn(`Unknown notification code: ${code}`)
      return { href: link || '#' }
  }
}