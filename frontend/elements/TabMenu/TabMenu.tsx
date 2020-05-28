import React, { ReactElement } from 'react'
import classNames from 'classnames';

interface TabProps {
  name: string,
  children: ReactElement | string,
  active?: string
}

interface Props {
  children?: ReactElement | ReactElement[],
  className?: string
}

/**
 * Our custom tabs
 */
const Tabs = ({ className, children }: Props) => {
  return (<ul className="TabMenu">
    {children}
  </ul>
  )
};

/**
 * A single tab
 */
const Tab = ({ name, children, active,}: TabProps) => {
  return <li className={classNames({ active: active == name })} key={name}>
    {children}
  </li>
}

/**
 * Makes space between tabs
 */
const TabSpacer = () => <li className="pusher"></li>


Tabs.displayName = 'Tabs'

export default Tabs

export { Tabs, Tab, TabSpacer }