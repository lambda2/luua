import React, { ReactElement } from 'react'
import classNames from 'classnames';

interface ItemProps {
  name: string,
  children: ReactElement | string,
  active?: string
}

interface Props {
  children?: ReactElement | ReactElement[],
  className?: string
}

/**
 * Our custom side menu
 */
const SideMenu = ({ className, children }: Props) => {
  return (<ul className="SideMenu">
    {children}
  </ul>
  )
};

/**
 * A single menu item
 */
const Item = ({ name, children, active,}: ItemProps) => {
  return <li className={classNames({ active: active == name })} key={name}>
    {children}
  </li>
}


SideMenu.displayName = 'SideMenu'

export default SideMenu

export { SideMenu, Item }