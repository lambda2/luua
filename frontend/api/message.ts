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
 * For for a message
 * @param attributes
 * @param token 
 */
export const vote = async (message_id: string | number, vote: MessageVoteOption, token: string): Promise<AxiosResponse<MessageVote>> => {
  const headers = getHeaders(token)
  return await api<MessageVote>(`/api/messages/${message_id}/vote`, { headers, data: { message_vote: { vote } }, method: 'POST' })
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

/**
 * Destroy an existing message
 * @param attributes 
 * @param token 
 */
export const destroy = async (attributes: MessageUpdateValues, token: string): Promise<AxiosResponse<Message>> => {
  const headers = getHeaders(token)
  return await api<Message>(`/api/messages/${attributes.id}`, { headers, data: { message: attributes }, method: 'DELETE' })
}


export const createOrUpdate = async (attributes: MessageUpdateValues, token: string): Promise<AxiosResponse<Message>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}