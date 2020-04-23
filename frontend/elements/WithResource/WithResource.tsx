import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { getHeaders, jsonFetch } from '../../utils/http';
import { useQuery } from 'react-query'
import nextCookie from 'next-cookies'
import Router, { useRouter } from 'next/router'

declare interface Props {
  children: React.ReactElement,
  endpoint: string,
  cacheKey?: string,
  needAuth?: boolean,
  fetchOptions?: RequestInit,
}

const WithResource: React.FC<Props> = ({
  endpoint,
  cacheKey,
  needAuth = false,
  fetchOptions = {},
  children
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const headers = getHeaders(currentUser && currentUser.jwt || '');

  if (needAuth && !currentUser) {
    Router.push('/')
  }

  const getResource = (opts: any) => {
    return jsonFetch(endpoint, { headers, ...fetchOptions, ...opts })
  }
  const { status, data, error } = useQuery(cacheKey || endpoint, getResource)

  console.log("Fetched resource: ", { status, data, error })

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { status, data, error })
  )

  return (<>{childrenWithProps}</>)
}

export default WithResource