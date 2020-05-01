import workspaces from "../pages/manage/workspaces"
import find from "lodash/find"

const can = (
  user: AuthedUser | null, 
  action: string,
  resource: any
) => {

  console.info(`Can ${user?.username || 'anonymous'} ${action} ${resource}`)
  switch (action) {
    case 'workspace.show':
      return true
    case 'workspace.edit':
      return user && find(resource?.workspace_users, {user_id: user.id, admin: true})
    case 'workspace.destroy':
      return true
  
    case 'mission.show':
      // @TODO check membership & cie
      return user &&
        true ||
        (resource.visibility === 'public')
    case 'mission.create':
      return user && find(user?.workspace_users, {workspace_id: resource.id, admin: true})
    case 'mission.edit':
      return user && find(user?.workspace_users, {workspace_id: resource.workspace_id, admin: true})
    case 'mission.destroy':
      return user && find(user?.workspace_users, { workspace_id: resource.workspace_id, admin: true })  
    default:
      return false
  }
}

export default can