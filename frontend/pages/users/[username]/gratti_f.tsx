import React from 'react'
import * as Sentry from '@sentry/node'

/**
 * Sample crash page
 */
const GrattiF = () => {

  Sentry.captureException(new Error("daaa fail !"))

  const throwError = () => {
    throw new Error("Gratti fail !");
  }


  
  return (
    <>
      <p>Should crash</p>
      <button onClick={throwError}>Break the world</button>
    </>
  )
}


export default GrattiF