import React, { useContext } from 'react';
import Link from 'next/link';
import UserContext from '../../contexts/UserContext';
import List from '../../elements/List/List';
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem';
import { useLocale } from '../../hooks/useLocale';

interface Props {
  data?: LightWorkspace[]
}

const WorkspaceList = ({ data }: Props) => {

  const { currentUser } = useContext(UserContext)
  const { t } = useLocale()

  return (<List
    dataSource={data}
    emptyText={t('workspace.empty')}
    renderItem={(e) => <WorkspaceItem {...e}/>}
    />)
}

export default WorkspaceList