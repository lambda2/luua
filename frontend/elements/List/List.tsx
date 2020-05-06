import React, { ReactElement } from 'react'
import classNames from 'classnames';
import { useLocale } from '../../hooks/useLocale';


interface Props<T> {
  itemLayout?: 'vertical' | 'horizontal'
  size?: string
  className?: string
  dataSource?: T[]
  key?: string
  renderItem: (element: T) => ReactElement | string
  renderEmpty?: () => ReactElement | string
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
      <p style={{ textAlign: 'center', padding: '1em'}} className="text-light">{t('generics.collection.empty')}</p>
    </div>
  }

  const {
    itemLayout = 'vertical',
    size = 'default',
    dataSource = [],
    key = 'id',
    renderItem,
    className,
    renderEmpty = defaultRenderEmpty
  } = props

  return (
    <ul className={classNames("List", className, `list-layout-${itemLayout} list-size-${size}`, { 'list-empty': !dataSource || dataSource.length === 0 })}>
      {(!dataSource || dataSource.length === 0) && renderEmpty()}
      {dataSource?.map((item: T) => <li key={(item as any)[key]}>
        {renderItem(item)}
      </li>)}
    </ul>
  );
};

List.displayName = 'List'

export default List