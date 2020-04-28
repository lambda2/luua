import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"

interface WorkspaceUserUpdateValues {
  admin?: boolean
  id: string | number
}

/**
 * Remove an user from a workspace
 * @param workspace_user_id the id of the workspace_user
 * @param token the JWT access token
 */
export const remove = async (workspace_user_id: string | number, token: string): Promise<AxiosResponse<WorkspaceUser>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceUser>(`/api/workspace_users/${workspace_user_id}`, { headers, data: {}, method: 'DELETE' })
}

/**
 * Update an existing workspace_user
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: WorkspaceUserUpdateValues, token: string): Promise<AxiosResponse<WorkspaceUser>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceUser>(`/api/workspace_users/${attributes.id}`, { headers, data: { workspace_user: attributes }, method: 'PATCH' })
}
