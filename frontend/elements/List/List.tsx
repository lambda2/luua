import React, { ReactElement } from 'react'
import classNames from 'classnames';
import { useLocale } from 'hooks/useLocale';


interface Props<T> {
  itemLayout?: 'vertical' | 'horizontal'
  size?: string
  className?: string
  dataSource?: T[]
  border?: boolean
  keyName?: string
  renderItem: (element: T) => ReactElement | string
  renderEmpty?: () => ReactElement | string
  emptyText?: ReactElement | string
}

/**
 * A simple list display
 */
const List = <T extends unknown>(
  props: Props<T>
) => {

  const { t } = useLocale()

  const defaultRenderEmpty = () => {
    return <div>
      <p style={{ textAlign: 'center', padding: '1em' }} className="text-light">{props.emptyText || t('generics.collection.empty')}</p>
    </div>
  }

  const {
    itemLayout = 'vertical',
    size = 'default',
    dataSource = [],
    keyName = 'id',
    border = true,
    renderItem,
    className = 'List',
    renderEmpty = defaultRenderEmpty
  } = props
  
  return (
    <ul className={classNames(className, `list-layout-${itemLayout} list-size-${size}`, { 'list-bordered': border, 'list-empty': !dataSource || dataSource.length === 0 })}>
      {(!dataSource || dataSource.length === 0) && renderEmpty()}
      {dataSource && dataSource?.map((item: T) => <li key={(item as any)[keyName] || 'none'}>
        {renderItem(item)}
      </li>)}
    </ul>
  );
};

List.displayName = 'List'

export default List