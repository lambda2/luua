import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


/**
 * Accept an invitation to join a workspace
 * @param workspace_invitation_id the id of the invitation
 * @param token the JWT access token
 */
export const accept = async (workspace_invitation_id: string | number, token: string): Promise<AxiosResponse<WorkspaceInvitation>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceInvitation>(`/api/workspace_invitations/${workspace_invitation_id}/accept`, { headers, data: {}, method: 'PATCH' })
}

/**
 * Reject an invitation to join a workspace
 * @param workspace_invitation_id the id of the invitation
 * @param token the JWT access token
 */
export const reject = async (workspace_invitation_id: string | number, token: string): Promise<AxiosResponse<WorkspaceInvitation>> => {
  const headers = getHeaders(token)
  return await api<WorkspaceInvitation>(`/api/workspace_invitations/${workspace_invitation_id}/reject`, { headers, data: {}, method: 'PATCH' })
}
