import React from 'react'
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
import './PrimaryLink.module.less'


/**
 * Our styled link
 */
const PrimaryLink: React.FC<LinkProps & {className?: string}> = ({
  className,
  children,
  ...props
}) => {

  return (
    <>
      <Link {...props}>
        <a className={classNames(className, 'ant-btn', 'ant-btn-primary', 'primary-link')}>{children}</a>
      </Link>
    </>
  );
};

PrimaryLink.displayName = 'PrimaryLink'

export default PrimaryLink