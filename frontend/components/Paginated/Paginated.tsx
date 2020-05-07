import React, { ReactElement, useState } from 'react'
import { AxiosResponse } from 'axios'
import flatten from 'lodash/flatten'

interface Props<T> {
  renderList: (data: T[]) => React.ReactNode
  status?: string
  error?: any
  data?: AxiosResponse<T[]>[]
  isFetching?: boolean
  canFetchMore?: boolean
  isFetchingMore?: boolean
  failureCount?: number
  fetchMore?: () => Promise<AxiosResponse<T[]>[]> | undefined
  page?: number
}

/**
 * A boundary to handle network status
 */
const Paginated = <T extends unknown>(
  props: Props<T>
) => {

  const {
    renderList,
    status,
    error,
    data,
    isFetching,
    failureCount,
    fetchMore,
    canFetchMore,
    isFetchingMore,
    page = 1
  } = props

  const [currentPage, setPage] = useState<number>(page)
  
  const responseData = flatten<T>(data?.map(d => d.data))
  
  switch (status) {
    case 'error':
      return (<>
        <p>Network error !</p>
        <p>{error && error.message}</p>
        {error?.response?.data && <pre>{JSON.stringify(error?.response?.data, null, 2)}</pre>}
      </>)
    case 'loading':
      return (<>
        <p>Loading...</p>
        {error && <p>{error.message}</p>}
      </>)  
    case 'success':
      if (renderList && responseData) {
        return <>
          {renderList(responseData)}
          <button
            onClick={() => fetchMore && fetchMore()}
            disabled={!canFetchMore || isFetchingMore}
          >
            {isFetchingMore
              ? 'Loading more...'
              : canFetchMore
                ? 'Load More'
                : 'Nothing more to load'}
          </button>

        </>
      }
    default:
      if (renderList && responseData) {
        return <>{renderList(responseData)}</>
      } else {
        console.error("No status");
        return (<>
          <p>Loading...</p>
          {error && <p>{error.message}</p>}
          {responseData && <pre>{JSON.stringify(responseData)}</pre>}
        </>)  
      }
  }
}

Paginated.displayName = 'Paginated'

export default Paginated
