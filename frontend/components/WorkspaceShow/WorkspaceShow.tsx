import React from 'react';
import { useLocale } from '../../hooks/useLocale';
import WorkspaceHeader from '../WorkspaceHeader/WorkspaceHeader';
import WorkspaceMissionList from '../WorkspaceMissionList/WorkspaceMissionList';
import WorkspaceUserAvatar from '../../elements/WorkspaceUserAvatar/WorkspaceUserAvatar';
import PageSection from '../../elements/PageSection/PageSection';
import MarkdownContent from '../../elements/MarkdownContent/MarkdownContent';

interface Props {
  workspace: Workspace
}

const WorkspaceShow = ({ workspace }: Props) => {

  const { t } = useLocale()

  return (
  <>
      <MarkdownContent content={workspace.description} />

      <PageSection title={t('workspace.members')}>
        {workspace.workspace_users.map((u: WorkspaceUser) =>
          <WorkspaceUserAvatar {...u}/>
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
