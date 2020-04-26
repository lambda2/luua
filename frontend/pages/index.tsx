import React, { useContext } from 'react'
import Layout from '../layouts/Layout/Layout'
import UserContext from '../contexts/UserContext'


const IndexPage = () => {

  const { currentUser } = useContext(UserContext)

  console.log({ currentUser })
  return (<>
    <h1>Hello world</h1>
  </>)
}

export default IndexPage
