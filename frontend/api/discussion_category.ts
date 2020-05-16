import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


export interface DiscussionCategoryUpdateValues {
  id?: number
  name?: string
  workspace_id?: number
  color?: string
  icon?: string
}

/**
 * Create a new discussion for the given workspace
 * @param attributes
 * @param token 
 */
export const create = async (workspace_id: string | number, attributes: DiscussionCategoryUpdateValues, token: string): Promise<AxiosResponse<DiscussionCategory>> => {
  const headers = getHeaders(token)
  return await api<DiscussionCategory>(`/api/workspaces/${workspace_id}/discussion_categories`, { headers, data: { discussion_category: attributes }, method: 'POST' })
}

/**
 * Update an existing discussion
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: DiscussionCategoryUpdateValues, token: string): Promise<AxiosResponse<DiscussionCategory>> => {
  const headers = getHeaders(token)
  return await api<DiscussionCategory>(`/api/discussion_categories/${attributes.id}`, { headers, data: { discussion_category: attributes }, method: 'PATCH' })
}

/**
 * Destroy an existing discussion
 * @param attributes 
 * @param token 
 */
export const destroy = async (attributes: DiscussionCategoryUpdateValues, token: string): Promise<AxiosResponse<DiscussionCategory>> => {
  const headers = getHeaders(token)
  return await api<DiscussionCategory>(`/api/discussion_categories/${attributes.id}`, { headers, data: { discussion_category: attributes }, method: 'DELETE' })
}


export const createOrUpdate = async (attributes: DiscussionCategoryUpdateValues, token: string): Promise<AxiosResponse<DiscussionCategory>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes.workspace_id, attributes, token)
  }
}