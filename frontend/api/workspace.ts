import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


export interface WorkspaceUpdateValues {
  id?: number
  name?: string
  image?: string
}

export interface WorkspaceInvitationValues {
  username?: string
  email?: string
  send_email?: boolean
}

/**
 * Create a new workspace
 * @param attributes
 * @param token 
 */
export const create = async (attributes: WorkspaceUpdateValues, token: string): Promise<AxiosResponse<Workspace>> => {
  const headers = getHeaders(token)
  return await api<Workspace>(`/api/workspaces`, { headers, data: { workspace: attributes }, method: 'POST' })
}

/**
 * Update an existing workspace
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: WorkspaceUpdateValues, token: string): Promise<AxiosResponse<Workspace>> => {
  const headers = getHeaders(token)
  return await api<Workspace>(`/api/workspaces/${attributes.id}`, { headers, data: { workspace: attributes }, method: 'PATCH' })
}


/**
 * Invite an user in a workspace
 * @param workspace_id
 * @param attributes 
 * @param token 
 */
export const invite = async (workspace_id: string | number, attributes: WorkspaceInvitationValues, token: string): Promise<AxiosResponse<WorkspaceInvitation>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceInvitation>(`/api/workspaces/${workspace_id}/invite`, { headers, data: attributes, method: 'POST' })
}


export const createOrUpdate = async (attributes: WorkspaceUpdateValues, token: string): Promise<AxiosResponse<Workspace>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}