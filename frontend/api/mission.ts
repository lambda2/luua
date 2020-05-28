import api, { getHeaders } from "../utils/http"
import { AxiosResponse } from "axios"
import pick from 'lodash/pick'


export interface MissionSkillUpdateValues {
  id?: number
  mission_id?: number
  skill_id?: number
  mandatory?: boolean
  level?: number
  created_at?: string
  updated_at?: string
}

export interface MissionUpdateValues {
  id?: number
  name?: string
  // mission_category_id?: number
  physical?: boolean
  description?: string
  begin_at?: string
  end_at?: string
  due_at?: string
  workspace_id?: number
  image?: string
  banner_image?: string
  mission_skills_attributes?: MissionSkillUpdateValues[]
  visibility?: 'draft' | 'public' | 'protected' | 'hidden'
}

const filterAttributes = (attributes: MissionUpdateValues): MissionUpdateValues => {
  const mission_skills_attributes: MissionSkillUpdateValues[] = attributes?.mission_skills_attributes?.map((msa) => {
    return pick(msa, ['id', 'mission_id', 'skill_id', 'mandatory', 'level', '_destroy'])
  }) || []
  return { ...attributes, mission_skills_attributes }
}

/**
 * Create a new mission
 * @param attributes
 * @param token 
 */
export const create = async (attributes: MissionUpdateValues, token: string): Promise<AxiosResponse<Mission>> => {
  const headers = getHeaders(token)
  const mission = filterAttributes(attributes)
  return await api<Mission>(`/api/missions`, { headers, data: { mission }, method: 'POST' })
}

/**
 * Update an existing mission
 * @param attributes 
 * @param token 
 */
export const update = async (attributes: MissionUpdateValues, token: string): Promise<AxiosResponse<Mission>> => {
  const headers = getHeaders(token)
  const mission = filterAttributes(attributes)
  return await api<Mission>(`/api/missions/${attributes.id}`, { headers, data: { mission }, method: 'PATCH' })
}

/**
 * Destroy an existing mission
 * @param attributes
 * @param token 
 */
export const destroy = async (attributes: MissionUpdateValues, token: string): Promise<AxiosResponse<Mission>> => {
  const headers = getHeaders(token)
  return await api<Mission>(`/api/missions/${attributes.id}`, { headers, method: 'DELETE' })
}

/**
 * Apply for a mission
 * @param attributes 
 * @param token
 */
export const apply = async (missionId: number, token: string): Promise<AxiosResponse<LightMissionUser>> => {
  const headers = getHeaders(token)
  return await api<LightMissionUser>(`/api/missions/${missionId}/apply`, { headers, data: { }, method: 'POST' })
}


export const createOrUpdate = async (attributes: MissionUpdateValues, token: string): Promise<AxiosResponse<Mission>> => {
  if (attributes.id) {
    return update(attributes, token)
  } else {
    return create(attributes, token)
  }
}