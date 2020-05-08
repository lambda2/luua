import React, { useState, useEffect } from 'react'
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
  data: T | undefined
  next: () => Promise<void>
  prev: () => Promise<void>
  refetch: () => Promise<void>
  page: number | undefined
  nextPage: number | undefined
  prevPage: number | undefined
  lastPage: number | undefined
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
): PaginatedResult<T> {

  const { language } = useLocale()
  const authHeaders = getHeaders(token || '');
  const headers = {
    'Accept-Language': language,
    ...authHeaders
  }

  const [page, setPage] = useState<number>(startpage && parseInt(`${startpage}`) || 1)
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
  const [nextPage, setNextPage] = useState<number | undefined>(undefined)
  const [prevPage, setPrevPage] = useState<number | undefined>(undefined)
  const [lastPage, setLastPage] = useState<number | undefined>(undefined)
  const [data, setData] = useState<T>()


  const endpoint = isArray(endpointKey) ? first(endpointKey) : endpointKey
  const fullKey = isArray(endpointKey) ? [...endpointKey, token, page] : [endpointKey, token, page]

  const stateFromHeaders = (lastPage: AxiosResponse<T>) => {
    const parsed = plh(lastPage.headers.link)

    // console.log("getFetchMore => ", { lastPage, allPages, parsed, h: lastPage.headers});
    // console.log("Nextpage -> ", parsed?.next?.page);

    setNextPage(parsed?.next?.page)
    setPrevPage(parsed?.prev?.page)
    setLastPage(parsed?.last?.page)
  }



  const getCollection = (page: any): Promise<AxiosResponse<T>> => {
    console.log({ page });

    return api<T>(`${endpoint}?page=${page}`, { headers })
  }

  const perform = async (page: number) => {
    const collection = await getCollection(page)
    setData(collection.data)
    stateFromHeaders(collection)
  }

  const next = async () => {
    setPage(page + 1)
    return await perform(page + 1)
  }

  const prev = async () => {
    setPage(page - 1)
    return await perform(page - 1)
  }

  const refetch = async (rpage?: number) => {
    return await perform(rpage || page)
  }

  useEffect(() => {
    perform(page)
  }, [endpoint])


  return {
    next,
    prev,
    refetch,
    page,
    nextPage,
    prevPage,
    lastPage,
    data,
  }

  // console.log("Using usePaginatedCollection with ", { fullKey, getCollection, hookOpts });

  
}


export default usePaginatedCollection