import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useLocale } from 'hooks/useLocale';
import Link from 'next/link';
import classNames from 'classnames';


interface Props {
  activeSlug?: string
  discussions?: LightDiscussion[]
}

const DiscussionLeftMenu = ({
  activeSlug,
  discussions
}: Props) => {

  return (<ul className="DiscussionLeftMenu">

    {discussions && discussions.map(d => {
      return (<li className={classNames({ active: activeSlug == d.slug })} key={d.slug}>
        {/* <Link {...workspace.missions.discussion(workspace_id, mission_id)}><a>{t('mission.summary')}</a></Link> */}
        <Link href="#"><a>
          {d.name}
        </a></Link>
      </li>)
    })}

  </ul>)


}
export default DiscussionLeftMenu
