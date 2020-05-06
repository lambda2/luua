import React, { ReactElement, useState } from 'react'
import { AxiosResponse } from 'axios'

interface Props<T> {
  children: React.ReactNode
  status?: string
  error?: any
  resolvedData?: AxiosResponse<T>
  latestData?: AxiosResponse<T>
  page?: number
}

/**
 * A boundary to handle network status
 */
const PaginatedNetworkBoudary = <T extends unknown>(
  props: Props<T>
) => {

  const {
    children,
    status,
    error,
    resolvedData,
    latestData,
    page = 1
  } = props

  const [currentPage, setPage] = useState<number>(page)
  
  const data = resolvedData?.data
  
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
      if (children && data) {
        return <>{children}</>
      }
    default:
      if (children && data) {
        return <>{children}</>
      } else {
        console.error("No status");
        return (<>
          <p>Loading...</p>
          {error && <p>{error.message}</p>}
        </>)  
      }
  }
}

PaginatedNetworkBoudary.displayName = 'PaginatedNetworkBoudary'

export default PaginatedNetworkBoudary
