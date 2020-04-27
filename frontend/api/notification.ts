import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"

/**
 * Mark a notification as read
 * @param notification_id the id of the notification to read
 * @param token the JWT access token
 */
export const read = async (notification_id: string | number, token: string): Promise<AxiosResponse<UserNotification>> => {
  const headers = getHeaders(token)
  return await api<UserNotification>(
    `/api/notifications/${notification_id}/read`,
    { headers, data: {}, method: 'PATCH' }
  )
}

/**
 * Mark all notifications as read
 * @param token the JWT access token
 */
export const readAll = async (token: string): Promise<AxiosResponse<UserNotification[]>> => {
  const headers = getHeaders(token)
  return await api<UserNotification[]>(
    `/api/notifications/read_all`,
    { headers, data: {}, method: 'PATCH' }
  )
}
