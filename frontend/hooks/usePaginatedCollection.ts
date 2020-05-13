import React, { useState, useEffect } from 'react'
import isArray from 'lodash/isArray';
import first from 'lodash/first';
import plh from 'parse-link-header';
import { useLocale } from './useLocale';
import api, { getHeaders } from '../utils/http';
import { AxiosResponse } from 'axios';


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
 * A hook allowing us to paginate a remote collection properly
 * @TODO this is a very basic and unsatisfying implementation :/
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
    'Cache-Control': 'no-cache',
    ...authHeaders
  }

  const [page, setPage] = useState<number>(startpage && parseInt(`${startpage}`) || 1)
  const [nextPage, setNextPage] = useState<number | undefined>(undefined)
  const [prevPage, setPrevPage] = useState<number | undefined>(undefined)
  const [lastPage, setLastPage] = useState<number | undefined>(undefined)
  const [data, setData] = useState<T>()

  const endpoint = isArray(endpointKey) ? first(endpointKey) : endpointKey

  const stateFromHeaders = (lastPage: AxiosResponse<T>) => {
    const parsed = plh(lastPage.headers.link)
    setNextPage(parsed?.next?.page)
    setPrevPage(parsed?.prev?.page)
    setLastPage(parsed?.last?.page)
  }

  const getCollection = (page: any): Promise<AxiosResponse<T>> => {
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
  }, [endpoint, token, startpage])


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
}


export default usePaginatedCollection