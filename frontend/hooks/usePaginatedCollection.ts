import React, { useState, useCallback } from 'react'
import plh from 'parse-link-header';
import { useLocale } from './useLocale';
import api, { getHeaders } from '../utils/http';
import { AxiosResponse } from 'axios';
import { usePaginatedQuery } from 'react-query';


export interface Props<T> {
  initialPage?: number
  endpoint: string
  token?: string
  queryKey?: string
  queryParams?: any
  initialData?: T[]
}

export interface PaginatedResult<T> {
  resolvedData: T[] | undefined
  latestData: T[] | undefined
  refetch: () => Promise<T[]>,
  page: number,
  nextPage: number | undefined,
  prevPage: number | undefined,
  lastPage: number | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>,
}


/**
 * A hook allowing us to paginate a remote collection properly
 * @TODO this is a very basic and unsatisfying implementation :/
 */
export function usePaginatedCollection<T>({
  initialPage = 1,
  endpoint,
  token,
  queryKey,
  queryParams,
  initialData
}: Props<T>): PaginatedResult<T> {
  const [page, setPage] = useState<number>(initialPage);
  const [nextPage, setNextPage] = useState<number | undefined>(undefined)
  const [prevPage, setPrevPage] = useState<number | undefined>(undefined)
  const [lastPage, setLastPage] = useState<number | undefined>(undefined)

  const { language } = useLocale()

  const authHeaders = getHeaders(token || '');

  // We don't want cache issues
  const headers = {
    'Accept-Language': language,
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    ...authHeaders
  }

  const stateFromHeaders = (lastPage: AxiosResponse<T[]>) => {
    const parsed = plh(lastPage.headers.link)
    setNextPage(parsed?.next?.page)
    setPrevPage(parsed?.prev?.page)
    setLastPage(parsed?.last?.page)
  }

  const fetchData = useCallback(async (key, page = 1) => {
    const res = await api<T[]>(`${endpoint}?page=${page?.page || page}`, { headers })
    stateFromHeaders(res)
    return res.data;
  }, []);

  const _queryParams = Object.assign(queryParams || {}, { page })
  const _queryKey = queryKey || endpoint
  const options = {
    initialData
  }

  const {
    resolvedData,
    latestData,
    refetch
  } = usePaginatedQuery<T[], [any, any]>(
    [_queryKey, _queryParams],
    fetchData,
    options
  );

  return {
    resolvedData,
    latestData,
    refetch,
    page,
    nextPage,
    prevPage,
    lastPage,
    setPage,
  }
}


export default usePaginatedCollection