import React, { useState, useCallback } from 'react'
import plh from 'parse-link-header';
import { useLocale } from './useLocale';
import api, { getHeaders } from '../utils/http';
import { AxiosResponse } from 'axios';
import { useInfiniteQuery } from 'react-query';


export interface Props<T> {
  initialPage?: number
  endpoint: string
  token?: string
  queryKey?: string
  queryParams?: any
  initialData?: T[]
}

export interface InfiniteResult<T> {
  status: "error" | "loading" | "success",
  data: (T[] | undefined)[],
  error: Error | null,
  isFetching: boolean,
  isFetchingMore: boolean,
  fetchMore: (moreVariable?: number | string) => Promise<(T[] | undefined)[]> | undefined,
  fetchNext: () => Promise<(T[] | undefined)[]> | undefined,
  canFetchMore: boolean | undefined,
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
export function useInfiniteCollection<T>({
  initialPage = 1,
  endpoint,
  token,
  queryKey,
  queryParams,
  initialData
}: Props<T>): InfiniteResult<T> {
  const [page, setPage] = useState<number>(initialPage);
  const [nextPage, setNextPage] = useState<number | undefined>(initialPage + 1)
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

  const _queryKey = queryKey || endpoint

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    _queryKey,
    async (key, page: any = initialPage) => {
      const res = await api<T[]>(`${endpoint}?page=${page?.page || page}`, { headers })
      stateFromHeaders(res)
      return res.data
    },
    {
      getFetchMore: lastGroup => nextPage,
      initialData: [initialData]
    }
  )

  const fetchNext = () => {
    return fetchMore(nextPage || page + 1)
  }

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    fetchNext,
    canFetchMore,
    page,
    nextPage,
    prevPage,
    lastPage,
    setPage,
  }
}


export default useInfiniteCollection