import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


export interface MessageUpdateValues {
  id?: number
  discussion_id: number | string
  parent_id?: number | string | undefined
  content: string
}

/**
 * Create a new message
 * @param attributes
 * @param token 
 */
export const create = async (attributes: MessageUpdateValues, token: string): Promise<AxiosResponse<Message>> => {
  const headers = getHeaders(token)
  return await api<Message>(`/api/discussions/${attributes.discussion_id}/messages`, { headers, data: { message: attributes }, method: 'POST' })
}

/**
 * Update an existing message
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: MessageUpdateValues, token: string): Promise<AxiosResponse<Message>> => {
  const headers = getHeaders(token)
  return await api<Message>(`/api/messages/${attributes.id}`, { headers, data: { message: attributes }, method: 'PATCH' })
}


export const createOrUpdate = async (attributes: MessageUpdateValues, token: string): Promise<AxiosResponse<Message>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}