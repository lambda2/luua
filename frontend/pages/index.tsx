import React, { useContext } from 'react'
import Layout from 'layouts/Layout/Layout'
import UserContext from 'contexts/UserContext'
import Head from 'components/Head/Head'


const IndexPage = () => {

  const { currentUser } = useContext(UserContext)

  console.log({ currentUser })
  return (<>
    <Head />
    <h1>Hello world</h1>
  </>)
}

export default IndexPage
