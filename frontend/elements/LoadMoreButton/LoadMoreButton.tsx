import React, { ReactElement } from 'react'
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import { useLocale } from 'hooks/useLocale';


interface Props {
  className?: string
  isFetchingMore?: boolean
  canFetchMore?: boolean
  textMore?: string | ReactElement
  textLoading?: string | ReactElement
  textNoMore?: string | ReactElement
  fetchMore?: (moreVariable?: unknown) => Promise<any> | undefined
}

/**
 * A "Load More" button at the end of infinite collections
 */
const LoadMoreButton = ({
  className,
  isFetchingMore,
  canFetchMore,
  textMore,
  textLoading,
  textNoMore,
  fetchMore,
  ...props
}: Props) => {

  const { t } = useLocale()

  const getText = () => {
    if (isFetchingMore) {
      return textLoading || t('generics.collection.loading')
    }
    if (canFetchMore) {
      return textMore || t('generics.collection.load-more')
    }
    return textNoMore || t('generics.collection.no-more')
  }
  
  return (
    <div className={classNames('LoadMoreButton', className)}>
      {(canFetchMore || isFetchingMore) ? <Button type="link" loading={isFetchingMore} disabled={!canFetchMore} onClick={fetchMore}>
        {getText()}
      </Button> : <p>{getText()}</p>}
    </div>
  );
};

LoadMoreButton.displayName = 'LoadMoreButton'

export default LoadMoreButton