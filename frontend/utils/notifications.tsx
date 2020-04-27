import ROUTES from "../routes/manage"


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
      return ROUTES.explore.missions.show(resource.mission_id)
    case 'mission.candidate.canceled':
      return ROUTES.manage.workspace.candidates.show(resource.workspace_id, resource.id)
    case 'mission.candidate.accepted':
      return ROUTES.explore.missions.show(resource.mission_id)
    case 'mission.candidate.completed':
      return ROUTES.manage.workspace.candidates.show(resource.workspace_id, resource.id)
    case 'mission.candidate.reviewed':
      return ROUTES.explore.missions.show(resource.mission_id)
    // case 'custom':
    //   return {href: link}
    default:
      return { href: link }
  }
}