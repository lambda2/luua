import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"
import { pick } from "lodash"


/**
 * accept an user for a mission
 * @param mission_user_id the id of the user-mission
 * @param token the JWT access token
 */
export const accept = async (mission_user_id: string | number, token: string): Promise<AxiosResponse<MissionUser>> => {
  const headers = getHeaders(token)
  return await api<MissionUser>(`/api/mission_users/${mission_user_id}/accept`, { headers, data: {}, method: 'PATCH' })
}

/**
 * reject an user for a mission
 * @param mission_user_id the id of the user-mission
 * @param token the JWT access token
 */
export const reject = async (mission_user_id: string | number, token: string): Promise<AxiosResponse<MissionUser>> => {
  const headers = getHeaders(token)
  return await api<MissionUser>(`/api/mission_users/${mission_user_id}/reject`, { headers, data: {}, method: 'PATCH' })
}

/**
 * complete an user for a mission
 * @param mission_user_id the id of the user-mission
 * @param token the JWT access token
 */
export const complete = async (mission_user_id: string | number, token: string): Promise<AxiosResponse<MissionUser>> => {
  const headers = getHeaders(token)
  return await api<MissionUser>(`/api/mission_users/${mission_user_id}/complete`, { headers, data: {}, method: 'PATCH' })
}

/**
 * review an user for a mission
 * @param mission_user_id the id of the user-mission
 * @param token the JWT access token
 */
export const review = async (mission_user_id: string | number, token: string): Promise<AxiosResponse<MissionUser>> => {
  const headers = getHeaders(token)
  return await api<MissionUser>(`/api/mission_users/${mission_user_id}/review`, { headers, data: {}, method: 'PATCH' })
}
