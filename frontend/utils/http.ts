/** 
 * Contains all our "network" utils functions
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import getConfig from 'next/config'
import { useQuery, QueryResult, QueryOptions, AnyQueryKey, usePaginatedQuery, PaginatedQueryResult, useInfiniteQuery, InfiniteQueryOptions, InfiniteQueryResult } from 'react-query';
import nextCookie from 'next-cookies'
import { NextPageContext } from 'next'
import { useLocale } from '../hooks/useLocale';
import cookie from 'js-cookie'
import isArray from 'lodash/isArray';
import first from 'lodash/first';
import plh from 'parse-link-header';

const { publicRuntimeConfig } = getConfig()

// The Luua API
export const BACK_URL = publicRuntimeConfig.backendUrl
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

  // fetch directly from local network, without external hop.  
  if (isServer()) {
    return `${BACK_URL}${endpoint}`
  }

  return `${API_URL}${endpoint}`
}

/**
 * Get the good URL for an image
 * @param {string} endpoint the endpoint we want to fetch (ex: `/users`)
 * @export
 */
export function cdnUrl(endpoint: string): string {
  if (endpoint.startsWith('http')) {
    return endpoint
  }
  return `${CDN_URL}${endpoint}`
}


/**
 * A hook allowing us to handle a remote collection properly
 *
 * @export
 * @template T the response type
 * @param {string} endpoint the url we want to fetch (without the domain)
 * @param {string} [token] the user auth token if we have one
 * @param {AxiosRequestConfig} [requestOpts]
 * @param {QueryOptions<T>} [hookOpts]
 * @returns {QueryResult<T>}
 */
export function useCollection<T>(
  endpointKey: string | any[] | undefined | boolean | number, token?: string, requestOpts?: AxiosRequestConfig, hookOpts?: QueryOptions<T>
): QueryResult<T> {

  const { language } = useLocale()
  const authHeaders = getHeaders(token || '');
  const headers = {
    'Accept-Language': language,
    ...authHeaders
  }

  const endpoint = isArray(endpointKey) ? first(endpointKey) : endpointKey
  const fullKey = isArray(endpointKey) ? [...endpointKey, token] : [endpointKey, token]
  const getCollection = (opts: any): Promise<T> => fetch<T>(endpoint, { headers, ...requestOpts, ...opts })

  return useQuery<T, AnyQueryKey>(
    fullKey as any,
    getCollection,
    hookOpts
  )
}

/**
 * A hook allowing us to handle a remote collection properly
 *
 * @export
 * @template T the response type
 * @param {string} endpoint the url we want to fetch (without the domain)
 * @param {string} [token] the user auth token if we have one
 * @param {AxiosRequestConfig} [requestOpts]
 * @param {QueryOptions<T>} [hookOpts]
 * @returns {PaginatedQueryResult<T>}
 */
export function usePaginatedCollection<T>(
  endpointKey: string | any[] | undefined | boolean | number,
  startpage?: number | string | string[],
  token?: string,
  requestOpts?: AxiosRequestConfig,
  hookOpts?: QueryOptions<AxiosResponse<T>>
): PaginatedQueryResult<AxiosResponse<T>> {

  const { language } = useLocale()
  const authHeaders = getHeaders(token || '');
  const headers = {
    'Accept-Language': language,
    ...authHeaders
  }

  const page = startpage || 1

  const endpoint = isArray(endpointKey) ? first(endpointKey) : endpointKey
  const fullKey = isArray(endpointKey) ? [...endpointKey, token, page] : [endpointKey, token, page]
  
  const getCollection = (opts: any, page: any): Promise<AxiosResponse<T>> => {
    console.log({ opts, page });
    
    return api<T>(endpoint, { headers, ...requestOpts, ...opts })
  }

  // console.log("Using usePaginatedCollection with ", { fullKey, getCollection, hookOpts });
  
  return usePaginatedQuery<AxiosResponse<T>, AnyQueryKey>(
    fullKey as any,
    getCollection,
    hookOpts
  )
}

/**
 * A hook allowing us to handle a remote collection properly
 *
 * @export
 * @template T the response type
 * @param {string} endpoint the url we want to fetch (without the domain)
 * @param {string} [token] the user auth token if we have one
 * @param {AxiosRequestConfig} [requestOpts]
 * @param {QueryOptions<T>} [hookOpts]
 * @returns {PaginatedQueryResult<T>}
 */
export function useInfiniteCollection<T>(
  endpointKey: string | any[] | undefined | boolean | number,
  startpage?: number | string | string[],
  token?: string,
  requestOpts?: AxiosRequestConfig,
  hookOpts?: any
): InfiniteQueryResult<AxiosResponse<T[]>, unknown> {

  const { language } = useLocale()
  const authHeaders = getHeaders(token || '');
  const headers = {
    'Accept-Language': language,
    ...authHeaders
  }

  const endpoint = isArray(endpointKey) ? first(endpointKey) : endpointKey
  
  const getCollection = (opts: any, page: any, a: any, b: any, c: any): Promise<AxiosResponse<T[]>> => {
    console.log({ opts, page, a, b, c });
    
    return api<T[]>(`${endpoint}?page=${page}`, { headers, ...requestOpts, ...opts })
  }

  // console.log("Using usePaginatedCollection with ", { fullKey, getCollection, hookOpts });
  
  const getFetchMore = (lastPage: AxiosResponse<T[]>, allPages: AxiosResponse<T[]>[]) => {
    const parsed = plh(lastPage.headers.link)

    // console.log("getFetchMore => ", { lastPage, allPages, parsed, h: lastPage.headers});
    // console.log("Nextpage -> ", parsed?.next?.page);
    
    return parsed?.next && parsed?.next?.page
  }

  return useInfiniteQuery<AxiosResponse<T[]>, AnyQueryKey, unknown>(
    endpoint as any,
    getCollection as any,
    { getFetchMore }
  )
}

/**
 * A simple fetch on our API, returning the data directly, not the whole response
 *
 * @export
 * @template T the response type
 * @param {string} url the url we want to fetch (without the domain)
 * @param {AxiosRequestConfig} opts
 * @returns {Promise<T>}
 */
export async function fetch<T>(url: string, opts: AxiosRequestConfig): Promise<T>
 {
  const { data } = await api<T>(url, opts)

  return data
}


/**
 * Perform a request on our API and return the reponse.
 *
 * @param {string} endpoint The endpoint to fetch (without the domain) (ex: `/missions`)
 * @param {AxiosRequestConfig} opts The fetch options
 * @returns {*} the JSON response
 * @export
 */
export async function api<T>(endpoint: string, opts: AxiosRequestConfig): Promise<AxiosResponse<T>> {

  const locale = cookie.get('locale') ? { 'Accept-Language': cookie.get('locale') } : {}

  const options = {
    ...opts,
    headers: {
      ...locale,
      ...opts.headers
    }
  }

  // NOTE Maybe we will need at some point 
  // {credentials: 'same-origin'}
  const payload = {
    url: apiUrl(endpoint),
    validateStatus: function (status: number) {
      return status < 300; // Reject only if the status code is greater than or equal to 500
    },
    ...options
  }

  return await axios(payload)

}

/**
 * A helper function to fetch a resource with token auth on getInitalProps
 * @param {NextPageContext} ctx the Page context
 * @param {string} endpoint The endpoint to fetch (without the domain) (ex: `/missions`)
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