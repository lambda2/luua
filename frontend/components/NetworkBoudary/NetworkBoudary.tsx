import React, { ReactElement } from 'react'
import Loader from 'elements/Loader/Loader'
import { useLocale } from 'hooks/useLocale'

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

  const { t } = useLocale()
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
        <Loader title={t('network.loading')}>
          {error && <p>{error.message}</p>}
        </Loader>
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
          <Loader title={t('network.loading')}>
            {error && <p>{error.message}</p>}
          </Loader>
        </>)  
      }
  }
}

NetworkBoundary.displayName = 'NetworkBoundary'

export default NetworkBoundary
