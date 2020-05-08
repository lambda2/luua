import React, { ReactElement, useState } from 'react'
import { AxiosResponse } from 'axios'
import flatten from 'lodash/flatten'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import { Button } from 'antd'

interface Props<T> {
  renderList: (data: T) => React.ReactNode
  data?: T
  next: () => Promise<void>
  prev: () => Promise<void>
  refetch: () => Promise<void>
  page: number | undefined
  nextPage: number | undefined
  prevPage: number | undefined
  lastPage: number | undefined
}

/**
 * A boundary to handle network status
 */
const Paginated = <T extends unknown>(
  props: Props<T>
) => {

  const {
    renderList,
    next,
    prev,
    data,
    refetch,
    page,
    nextPage,
    prevPage,
    lastPage
  } = props
  

  // const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null)

  // useIntersectionObserver({
  //   target: loadMoreButtonRef,
  //   onIntersect: fetchMore,
  // })
  
  // const renderCollection = (data: AxiosResponse<T[]>[]) => {
  //   return (<>
  //     {data.map((page, i) => <React.Fragment key={i}>
  //         {renderList(page.data)}
  //       </React.Fragment>
  //     )}
  //   </>)
  // }

  console.log({ data })

  return <>
    {prevPage && <Button onClick={prev}>Page {prevPage}</Button>}
    
    {data && renderList(data)}

    <Button.Group>
      {prevPage && <Button onClick={prev}>Page {prevPage}</Button>}
      <Button onClick={() => refetch()}>Refresh</Button>
      {nextPage && <Button onClick={next}>Page {nextPage}</Button>}
    </Button.Group>
  </>

  // switch (status) {
  //   case 'error':
  //     return (<>
  //       <p>Network error !</p>
  //       <p>{error && error.message}</p>
  //       {error?.response?.data && <pre>{JSON.stringify(error?.response?.data, null, 2)}</pre>}
  //     </>)
  //   case 'loading':
  //     return (<>
  //       <p>Loading...</p>
  //       {error && <p>{error.message}</p>}
  //     </>)  
  //   case 'success':
  //     if (renderList && data) {
  //       return <>
  //         {renderCollection(data)}
  //         <div>
  //           <button
  //             ref={loadMoreButtonRef}
  //             onClick={() => fetchMore()}
  //             disabled={!canFetchMore || isFetchingMore}
  //           >
  //             {isFetchingMore
  //               ? 'Loading more...'
  //               : canFetchMore
  //                 ? 'Load More'
  //                 : 'Nothing more to load'}
  //           </button>
  //         </div>
  //         <div>
  //           {isFetching && !isFetchingMore ? 'Background Updating...' : null}
  //         </div>

  //       </>
  //     }
  //   default:
  //     if (renderList && data) {
  //       return <>{renderCollection(data)}</>
  //     } else {
  //       console.error("No status");
  //       return (<>
  //         <p>Loading...</p>
  //         {error && <p>{error.message}</p>}
  //         {data && <pre>{JSON.stringify(data)}</pre>}
  //       </>)  
  //     }
  // }
}

Paginated.displayName = 'Paginated'

export default Paginated
