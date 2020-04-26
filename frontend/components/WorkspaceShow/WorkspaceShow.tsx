import React from 'react';
import { useLocale } from '../../hooks/useLocale';
import WorkspaceHeader from '../WorkspaceHeader/WorkspaceHeader';
import WorkspaceMissionList from '../WorkspaceMissionList/WorkspaceMissionList';
import WorkspaceUserAvatar from '../../elements/WorkspaceUserAvatar/WorkspaceUserAvatar';
import PageSection from '../../elements/PageSection/PageSection';

interface Props {
  workspace: Workspace
}

const WorkspaceShow = ({ workspace }: Props) => {

  const { t } = useLocale()

  return (
  <>

      <PageSection title={t('workspace.members')}>
        {workspace.workspaces_users.map((u: WorkspaceUser) =>
          <WorkspaceUserAvatar {...u} />
        )}
      </PageSection>

      <PageSection title={t('workspace.missions')}>
        <WorkspaceMissionList data={workspace.missions} />
      </PageSection>

      <PageSection title={t('workspace.applicants')}>

      </PageSection>

  </>)
}

export default WorkspaceShow
