import workspaces from "../pages/manage/workspaces"
import find from "lodash/find"
import moment from "moment"

// @TODO do a switch/case typing here
const can = (
  user: AuthedUser | null, 
  action: string,
  resource: any
) => {

  // console.info(`Can ${user?.username || 'anonymous'} ${action} ${resource}`)
  switch (action) {
    case 'workspace.show':
      return true
    case 'workspace.edit':
      return user && resource && find(resource?.workspace_users, {user_id: user.id, admin: true})
    case 'workspace.destroy':
      return true
  




    case 'mission.show':
      // @TODO check membership & cie
      return user && resource &&
        true ||
        (resource.visibility === 'public')
    case 'mission.apply':
      return true
    case 'mission.create':
      return user && resource && find(user?.workspace_users, {workspace_id: resource.id, admin: true})
    case 'mission.edit':
      return user && resource && find(user?.workspace_users, {workspace_id: resource.workspace_id, admin: true})
    case 'mission.destroy':
      return user && resource && find(user?.workspace_users, { workspace_id: resource.workspace_id, admin: true })  
    case 'mission_user.index':
      // Resource is a mission
      return user && resource && find(user?.workspace_users, { workspace_id: resource.workspace_id, admin: true })  



    case 'discussion.post':
      return user && !resource.locked_at
    case 'discussion.create':
      return user && resource && find(user?.workspace_users, {workspace_id: resource.id})
    case 'discussion.edit':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, {workspace_id: resource.workspace_id, admin: true}))
      )
    case 'discussion.create-poll':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, {workspace_id: resource.workspace_id, admin: true}))
      )
    case 'discussion.create-mission':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, {workspace_id: resource.workspace_id, admin: true}))
      )
    case 'discussion.lock':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, { workspace_id: resource.workspace_id, admin: true }))
      )

    case 'discussion.destroy':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, { workspace_id: resource.workspace_id, admin: true }))
      )


    case 'poll.create':
      return user && resource && find(user?.workspace_users, {workspace_id: resource.id})
    case 'poll.edit':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, {workspace_id: resource.workspace_id, admin: true}))
      )
    case 'poll.destroy':
      return user && resource && (
        (resource.user_id === user.id) ||
        (find(user?.workspace_users, { workspace_id: resource.workspace_id, admin: true }))
      )
    case 'poll.results':
      const poll = resource as LightPoll
      return user && poll && (
        (poll.reveal === 'always') ||
        (poll.reveal === 'on_vote') ||
        (poll.reveal === 'on_close' && (
          poll.closed_at !== null || moment(poll.end_at).isBefore(moment())
        ))
      )
    case 'poll.close':
      const pollclose = resource as LightPoll
      return user && pollclose.user_id === user.id




    case 'message.destroy':
      return user && resource && (
        (resource.user_id === user.id)
      )
    case 'message.edit':
      return user && resource && (
        (resource.user_id === user.id)
      )
    default:
      return false
  }
}

export default can