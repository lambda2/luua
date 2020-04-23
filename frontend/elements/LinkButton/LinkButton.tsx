import React, { ReactNode } from 'react'
import { Button as OriginalButton } from 'antd'
import { ButtonProps } from 'antd/lib/button';
import Router from 'next/router';


interface Props extends ButtonProps {
  children?: ReactNode
  href: string
  as?: string
}

/**
 * Our own submit button
 */
const LinkButton: React.FC<Props> = ({
  children,
  href,
  as,
  ...props
}) => {

  const onClick = () => {
    Router.push(href, as)
  }

  return (
    <OriginalButton onClick={onClick} {...props}>
      {children}
    </OriginalButton>
  );
};

LinkButton.displayName = 'LinkButton'

export default LinkButton