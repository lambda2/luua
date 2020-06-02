import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


/**
 * search an user
 * @param q the search param
 * @param token the JWT access token
 */
export const search = async (q: string, token: string): Promise<AxiosResponse<BaseUser[]>> => {
  const headers = getHeaders(token)
  return await api<BaseUser[]>(`/api/users/search?q=${q}`, { headers })
}
