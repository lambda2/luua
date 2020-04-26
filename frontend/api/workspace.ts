import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


export interface WorkspaceUpdateValues {
  id?: number
  name?: string
  image?: string
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


export const createOrUpdate = async (attributes: WorkspaceUpdateValues, token: string): Promise<AxiosResponse<Workspace>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}