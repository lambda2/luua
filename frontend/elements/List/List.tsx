import React, { ReactElement } from 'react'
import classNames from 'classnames';


interface Props<T> {
  itemLayout?: 'vertical' | 'horizontal'
  size?: string
  dataSource?: T[]
  key?: string
  renderItem: (element: T) => ReactElement | string
}

/**
 * A simple list display
 */
const List = <T extends unknown>(
  props: Props<T>
) => {

  const {
    itemLayout = 'vertical',
    size = 'default',
    dataSource = [],
    key = 'id',
    renderItem
  } = props

  return (
    <ul className={classNames("List", `list-layout-${itemLayout} list-size-${size}`, { 'list-empty': !dataSource || dataSource.length === 0 })}>
      {dataSource?.map((item: T) => <li key={(item as any)[key]}>
        {renderItem(item)}
      </li>)}
    </ul>
  );
};

List.displayName = 'List'

export default List