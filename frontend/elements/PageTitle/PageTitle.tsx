import React from 'react'
// import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
// import './PageTitle.module.less'
import Title from '../Title/Title';

interface Props {
  title: string | React.ReactNode
  extra?: React.ReactNode[]
  className?: string
}

/**
 * Our custom heading
 */
const PageTitle: React.FC<Props> = ({
  children,
  title,
  extra = [],
  className = ''
}) => {

  return (
    <header className={classNames(className, 'PageTitle')}>
      <Title>{title}</Title>
      <aside>
        {extra}
      </aside>
      {children}
    </header>
  );
};

PageTitle.displayName = 'PageTitle'

export default PageTitle