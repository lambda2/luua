import React from 'react'
import { Button } from 'antd'

interface PaginationButtonsProps<T> {
  next: () => void
  prev: () => void
  last?: () => void
  first?: () => void
  page: number | undefined
  nextPage: number | undefined
  prevPage: number | undefined
  lastPage: number | undefined
}
interface Props<T> extends PaginationButtonsProps<T> {
  renderList: (data: T) => React.ReactNode
  data?: T
}


const PaginationButtons = <T extends unknown>(
  props: PaginationButtonsProps<T>
) => {

  const {
    next,
    prev,
    last,
    first,
    page,
    nextPage,
    prevPage,
    lastPage
  } = props

  const style: React.CSSProperties = {
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    padding: '8px'
  }

  if (prevPage || nextPage) {
    return (<div style={style}>
      <Button.Group>
        {prevPage && first && <Button disabled={page == 1 || !prevPage} onClick={first}>First</Button>}
        {prev && <Button disabled={!prevPage} onClick={prev}>Previous</Button>}
        <Button disabled type="link">Page {page} / {lastPage || page}</Button>
        {next && <Button disabled={page == lastPage || !nextPage} onClick={next}>Next</Button>}
        {lastPage && last && <Button disabled={page == lastPage || !nextPage} onClick={last}>Last</Button>}
      </Button.Group>
    </div>)
  } else {
    return <></>
  }
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
    data,
    ...paginationProps
  } = props
  
  return <>
    <PaginationButtons {...paginationProps} />
    {data && renderList(data)}
    <PaginationButtons {...paginationProps} />
  </>

}

Paginated.displayName = 'Paginated'

export default Paginated
