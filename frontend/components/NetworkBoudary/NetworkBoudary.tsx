import React, { ReactElement } from 'react'

interface Props<T> {
  children: React.ReactNode
  status?: string
  error?: any
  data?: T
}

/**
 * A boundary to handle network status
 */
const NetworkBoundary = <T extends unknown>(
  props: Props<T>
) => {

  const { children, status, error, data } = props

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

NetworkBoundary.displayName = 'NetworkBoundary'

export default NetworkBoundary
