import React from 'react'
import classNames from 'classnames';
import Title from '../Title/Title';

interface Props {
  children?: string | React.ReactNode
  className?: string
}

/**
 * Our custom heading
 */
const Hero = ({
  children,
  className = ''
}: Props) => (
  <header className={classNames(className, 'Hero')}>
    {children}
  </header>
)

Hero.displayName = 'Hero'

export default Hero