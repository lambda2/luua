import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import routes from '../../routes/manage'
import { Tag, List, Avatar } from 'antd';
import MissionVisibilityBadge from '../../elements/MissionVisibilityBadge/MissionVisibilityBadge';
import './MissionItemMeta.module.less'
import { useLocale } from '../../hooks/useLocale';
import Link from 'next/link';
import { cdnUrl } from '../../utils/http';

const { manage } = routes

interface Props {
  skills: string[]
}
const MissionItemMeta = ({
  skills,
}: Props) => {

  return (
    <aside className="mission-item-meta">
      {skills.map((s: string) => <Tag key={s}>{s}</Tag>)}
    </aside>
  )

}

export default MissionItemMeta