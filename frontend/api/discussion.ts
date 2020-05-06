import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


export interface DiscussionUpdateValues {
  id?: number
  name: string
  description?: string
  resource_type?: string
  resource_id?: number
}

/**
 * Create a new discussion for the given workspace
 * @param attributes
 * @param token 
 */
export const createForWorkspace = async (workspace_id: string | number, attributes: DiscussionUpdateValues, token: string): Promise<AxiosResponse<Discussion>> => {
  const headers = getHeaders(token)
  return await api<Discussion>(`/api/workspaces/${workspace_id}/discussions`, { headers, data: { discussion: attributes }, method: 'POST' })
}

/**
 * Create a new discussion for the given mission
 * @param attributes
 * @param token 
 */
export const createForMission = async (mission_id: string | number, attributes: DiscussionUpdateValues, token: string): Promise<AxiosResponse<Discussion>> => {
  const headers = getHeaders(token)
  return await api<Discussion>(`/api/missions/${mission_id}/discussions`, { headers, data: { discussion: attributes }, method: 'POST' })
}

/**
 * Update an existing discussion
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: DiscussionUpdateValues, token: string): Promise<AxiosResponse<Discussion>> => {
  const headers = getHeaders(token)
  return await api<Discussion>(`/api/discussions/${attributes.id}`, { headers, data: { discussion: attributes }, method: 'PATCH' })
}

/**
 * Destroy an existing discussion
 * @param attributes 
 * @param token 
 */
export const destroy = async (attributes: DiscussionUpdateValues, token: string): Promise<AxiosResponse<Discussion>> => {
  const headers = getHeaders(token)
  return await api<Discussion>(`/api/discussions/${attributes.id}`, { headers, data: { discussion: attributes }, method: 'DELETE' })
}


export const createOrUpdate = async (attributes: DiscussionUpdateValues, token: string): Promise<AxiosResponse<Discussion>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else if (attributes.resource_id && attributes?.resource_type === 'Workspace') {
    return createForWorkspace(attributes.resource_id, attributes, token)
  } else if (attributes.resource_id && attributes?.resource_type === 'Mission') {
    return createForMission(attributes.resource_id, attributes, token)
  } else {
    console.error("Unable to create discussion, resource is missing");
    throw new Error;
  }
}