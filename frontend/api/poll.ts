import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"
import pick from 'lodash/pick'


export interface PollOptionUpdateValues {
  id?: number
  poll_id?: number
  name?: string
  description?: string
  icon?: string
}

export interface PollUpdateValues {
  id?: number
  name?: string
  slug?: string
  category?: number // @TODO
  description?: string | null
  begin_at?: string | null
  end_at?: string | null
  anonymity?: PollAnonymity
  authentication?: PollAuthentication
  poll_type?: PollType
  visibility?: PollVisibility
  user_id?: number
  poll_category_id?: number | null
  workspace_id?: number
  poll_id?: number | null
  options_attributes?: PollOptionUpdateValues[]
}

const filterAttributes = (attributes: PollUpdateValues): PollUpdateValues => {
  const options_attributes: PollOptionUpdateValues[] = attributes?.options_attributes?.map((msa) => {
    return pick(msa, ['id', 'poll_id', 'name', 'description', 'icon', '_destroy'])
  }) || []
  return { ...attributes, options_attributes }
}

/**
 * Create a new poll
 * @param attributes
 * @param token 
 */
export const create = async (attributes: PollUpdateValues, token: string): Promise<AxiosResponse<Poll>> => {
  const headers = getHeaders(token)
  const poll = filterAttributes(attributes)
  return await api<Poll>(`/api/polls`, { headers, data: { poll }, method: 'POST' })
}

/**
 * Create a new poll
 * @param attributes
 * @param token 
 */
export const vote = async (poll_id: number, poll_option_id: number, token: string): Promise<AxiosResponse<Poll>> => {
  const headers = getHeaders(token)
  return await api<Poll>(`/api/polls/${poll_id}/vote`, { headers, data: { user_vote: { poll_option_id } }, method: 'POST' })
}

/**
 * Update an existing poll
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: PollUpdateValues, token: string): Promise<AxiosResponse<Poll>> => {
  const headers = getHeaders(token)
  const poll = filterAttributes(attributes)
  return await api<Poll>(`/api/polls/${attributes.id}`, { headers, data: { poll }, method: 'PATCH' })
}

/**
 * Destroy an existing poll
 * @param attributes 
 * @param token 
 */
export const destroy = async (attributes: PollUpdateValues, token: string): Promise<AxiosResponse<Poll>> => {
  const headers = getHeaders(token)
  return await api<Poll>(`/api/polls/${attributes.id}`, { headers, data: { poll: attributes }, method: 'DELETE' })
}

export const createOrUpdate = async (attributes: PollUpdateValues, token: string): Promise<AxiosResponse<Poll>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}