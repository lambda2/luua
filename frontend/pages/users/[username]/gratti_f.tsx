import React from 'react'

/**
 * Sample crash page
 */
const GrattiF = () => {

  throw new Error("Gratti fail !");
  
  return (
    <>
      <p>Should crash</p>
    </>
  )
}


export default GrattiF