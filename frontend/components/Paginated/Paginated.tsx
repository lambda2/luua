import React, { ReactElement, useState } from 'react'
import { AxiosResponse } from 'axios'
import flatten from 'lodash/flatten'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

interface Props<T> {
  renderList: (data: T[]) => React.ReactNode
  status?: string
  error?: any
  data?: AxiosResponse<T[]>[]
  isFetching?: boolean
  canFetchMore?: boolean
  isFetchingMore?: boolean
  failureCount?: number
  fetchMore: () => Promise<AxiosResponse<T[]>[]> | undefined
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
  

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null)

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
  })
  
  const renderCollection = (data: AxiosResponse<T[]>[]) => {
    return (<>
      {data.map((page, i) => <React.Fragment key={i}>
          {renderList(page.data)}
        </React.Fragment>
      )}
    </>)
  }

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
      if (renderList && data) {
        return <>
          {renderCollection(data)}
          <div>
            <button
              ref={loadMoreButtonRef}
              onClick={() => fetchMore()}
              disabled={!canFetchMore || isFetchingMore}
            >
              {isFetchingMore
                ? 'Loading more...'
                : canFetchMore
                  ? 'Load More'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingMore ? 'Background Updating...' : null}
          </div>

        </>
      }
    default:
      if (renderList && data) {
        return <>{renderCollection(data)}</>
      } else {
        console.error("No status");
        return (<>
          <p>Loading...</p>
          {error && <p>{error.message}</p>}
          {data && <pre>{JSON.stringify(data)}</pre>}
        </>)  
      }
  }
}

Paginated.displayName = 'Paginated'

export default Paginated
