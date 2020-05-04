import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


/**
 * Accept a request to join a workspace
 * @param workspace_request_id the id of the invitation
 * @param token the JWT access token
 */
export const accept = async (workspace_request_id: string | number, token: string): Promise<AxiosResponse<WorkspaceRequest>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceRequest>(`/api/workspace_requests/${workspace_request_id}/accept`, { headers, data: {}, method: 'PATCH' })
}

/**
 * Reject a request to join a workspace
 * @param workspace_request_id the id of the invitation
 * @param token the JWT access token
 */
export const reject = async (workspace_request_id: string | number, token: string): Promise<AxiosResponse<WorkspaceRequest>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceRequest>(`/api/workspace_requests/${workspace_request_id}/reject`, { headers, data: {}, method: 'PATCH' })
}
