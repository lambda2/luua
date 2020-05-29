import React, { ReactElement } from 'react'
import classNames from 'classnames';
import { useLocale } from 'hooks/useLocale';


interface Props<T> {
  itemLayout?: 'vertical' | 'horizontal'
  size?: string
  className?: string
  dataSource?: T[]
  keyName?: string
  itemWidth?: 'auto' | number | string
  renderItem: (element: T) => ReactElement | string
  renderEmpty?: () => ReactElement | string
  emptyText?: ReactElement | string
}

/**
 * A simple grid display
 */
const Grid = <T extends unknown>(
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
    itemWidth = 'auto',
    dataSource = [],
    keyName = 'id',
    renderItem,
    className = 'Grid',
    renderEmpty = defaultRenderEmpty
  } = props

  console.log({ dataSource });

  const gridStyles = {
    flex: itemWidth === 'auto' ? 'auto' : `1 1 ${itemWidth}`
  }
  
  return (
    <ul className={classNames(className, `grid-layout-${itemLayout} grid-size-${size}`, { 'grid-empty': !dataSource || dataSource.length === 0 })}>
      {(!dataSource || dataSource.length === 0) && renderEmpty()}
      {dataSource && dataSource?.map((item: T) => <li style={gridStyles} key={(item as any)[keyName]}>
        {renderItem(item)}
      </li>)}
    </ul>
  );
};

Grid.displayName = 'Grid'

export default Grid