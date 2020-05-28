import React from 'react'
import { Button } from 'antd'

interface Props<T> {
  renderList: (data: T) => React.ReactNode
  data?: T
  next: () => void
  prev: () => void
  page: number | undefined
  nextPage: number | undefined
  prevPage: number | undefined
  lastPage: number | undefined
}

/**
 * A wrapper to manage pages
 * @TODO no error handling here
 * @TODO no infinite handling
 */
const Paginated = <T extends unknown>(
  props: Props<T>
) => {

  const {
    renderList,
    next,
    prev,
    data,
    page,
    nextPage,
    prevPage,
    lastPage
  } = props
  
  return <>
    {prevPage && <Button onClick={prev}>Page {prevPage}</Button>}

    {data && renderList(data)}

    <Button.Group>
      {prevPage && <Button onClick={prev}>Page {prevPage}</Button>}
      {/* <Button onClick={() => refetch()}>Refresh</Button> */}
      {nextPage && <Button onClick={next}>Page {nextPage}</Button>}
    </Button.Group>
  </>

}

Paginated.displayName = 'Paginated'

export default Paginated
