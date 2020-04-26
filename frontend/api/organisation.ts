import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"


export interface OrganizationUpdateValues {
  id?: string
  name: string
  description?: string
  country_id?: number
  organization_type: string
  image?: string
}

/**
 * Create a new Organization
 * @param attributes
 * @param token 
 */
export const create = async (attributes: OrganizationUpdateValues, token: string): Promise<AxiosResponse<Organization>> => {
  const headers = getHeaders(token)
  return await api<Organization>(`/api/organizations`, { headers, data: { organization: attributes }, method: 'POST' })
}

/**
 * Update an existing organization
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: OrganizationUpdateValues, token: string): Promise<AxiosResponse<Organization>> => {
  const headers = getHeaders(token)
  return await api<Organization>(`/api/organizations/${attributes.id}`, { headers, data: { organization: attributes }, method: 'PATCH' })
}


export const createOrUpdate = async (attributes: OrganizationUpdateValues, token: string): Promise<AxiosResponse<Organization>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}