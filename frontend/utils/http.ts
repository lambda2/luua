/** 
 * Contains all our "network" utils functions
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import getConfig from 'next/config'
import { useQuery, QueryResult, QueryOptions, AnyQueryKey } from 'react-query';
import nextCookie from 'next-cookies'
import { NextPageContext } from 'next'

const { publicRuntimeConfig } = getConfig()

// The Luua API
export const API_URL = publicRuntimeConfig.apiUrl
export const CDN_URL = publicRuntimeConfig.cdnUrl


export interface ErrorResponse {
  status?: number
  error?: string
  exception?: string
  traces?: any
}

export type ApiResponse<T> = QueryResult<T> | QueryResult<ErrorResponse>


export function isErrorResponse<T>(response: ApiResponse<T>): response is QueryResult<ErrorResponse> {
  return (response as QueryResult<ErrorResponse>).status === 'error';
}



  /**
  * Are we in server-side ?
  *
  * @returns bool
  * @export
  */
export function isServer() {
  if (typeof window === "undefined") return true;
  return false;
}


/**
 * Build the header we should send on every API request
 * @param token the JWT user token
 * @export
 */
export function getHeaders(token: string | undefined) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: token || '',
  }
}


/**
 * Get the good URL of our API
 * @param {string} endpoint the endpoint we want to fetch (ex: `/users`)
 * @export
 */
export function apiUrl(endpoint: string): string {

  // @TODO To uncomment when we're deployed, it will allow us to
  // fetch directly from local network, without external hop.
  // 
  // if (isServer()) {
  //   return `${BACK_URL}${endpoint}`
  // }

  return `${API_URL}${endpoint}`
}

/**
 * Get the good URL for an image
 * @param {string} endpoint the endpoint we want to fetch (ex: `/users`)
 * @export
 */
export function cdnUrl(endpoint: string): string {
  return `${CDN_URL}${endpoint}`
}



export function useCollection<T>(
  endpoint: string, token?: string, requestOpts?: AxiosRequestConfig, hookOpts?: QueryOptions<T>
): QueryResult<T> {
  const headers = getHeaders(token || '');

  const getCollection = (opts: any): Promise<T> => fetch<T>(endpoint, { headers, ...requestOpts, ...opts })

  return useQuery<T, AnyQueryKey>(
    [endpoint, token],
    getCollection,
    hookOpts
  )
}

export async function fetch<T>(url: string, opts: AxiosRequestConfig): Promise<T>
 {
  const { data } = await api<T>(url, opts)

  return data
}


/**
 * Perform a request on our API and return the result.
 *
 * @param {string} endpoint The endpoint to fetch (ex: `/users`)
 * @param {AxiosRequestConfig} opts The fetch options
 * @returns {*} the JSON response
 * @export
 */
export async function api<T>(endpoint: string, opts: AxiosRequestConfig): Promise<AxiosResponse<T>> {


  // NOTE Maybe we will need at some point 
  // {credentials: 'same-origin'}
  const payload = {
    url: apiUrl(endpoint),
    validateStatus: function (status: number) {
      return status < 300; // Reject only if the status code is greater than or equal to 500
    },
    ...opts
  }

  return await axios(payload)

}

/**
 * A helper function to fetch a resource with token auth on getInitalProps
 * @param ctx 
 * @param endpoint 
 */
export async function fetchInitialData<T>(ctx: NextPageContext, endpoint: string) {
  const { token } = nextCookie(ctx)
  const headers = getHeaders(token || '');
  try {
    const { data } = await api<T>(endpoint, { headers })
    return { initialData: (data || []), token }
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default api