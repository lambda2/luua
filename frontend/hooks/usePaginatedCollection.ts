import React, { useState } from 'react'
import isArray from 'lodash/isArray';
import first from 'lodash/first';
import plh from 'parse-link-header';
import { useLocale } from './useLocale';
import api, { getHeaders } from '../utils/http';
import { usePaginatedQuery, useInfiniteQuery, InfiniteQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';


interface PaginatedCollectionParams {
  endpointKey: string | any[] | undefined | boolean | number,
  startpage?: number | string | string[],
  token?: string
}

export interface PaginatedResult<T> {
  data: T[]
  isFetchingMore: boolean
  canFetchMore: boolean | undefined
  fetchMore: (moreVariable?: any) => Promise<T[]> | undefined
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
  token?: string
): InfiniteQueryResult<AxiosResponse<T>> {

  const { language } = useLocale()
  const authHeaders = getHeaders(token || '');
  const headers = {
    'Accept-Language': language,
    ...authHeaders
  }

  const [page, setPage] = useState<number>(startpage && parseInt(`${startpage}`) || 1)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
  const [data, setData] = useState<T[]>([])


  const endpoint = isArray(endpointKey) ? first(endpointKey) : endpointKey
  const fullKey = isArray(endpointKey) ? [...endpointKey, token, page] : [endpointKey, token, page]

  const getFetchMore = (lastPage: AxiosResponse<T[]>, allPages: AxiosResponse<T[]>[]) => {
    const parsed = plh(lastPage.headers.link)

    // console.log("getFetchMore => ", { lastPage, allPages, parsed, h: lastPage.headers});
    // console.log("Nextpage -> ", parsed?.next?.page);

    return parsed?.next && parsed?.next?.page
  }

  const getCollection = (opts: any, page: any): Promise<AxiosResponse<T>> => {
    console.log({ opts, page });

    return api<T>(endpoint, { headers, ...opts })
  }

  // console.log("Using usePaginatedCollection with ", { fullKey, getCollection, hookOpts });

  
}


export default usePaginatedCollection