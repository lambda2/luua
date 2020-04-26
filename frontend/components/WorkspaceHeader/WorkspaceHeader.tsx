import React, { ReactElement } from 'react';
import { useLocale } from '../../hooks/useLocale';
import manage from '../../routes/manage';
import PrimaryLink from '../../elements/PrimaryLink/PrimaryLink';
import PageTitle from '../../elements/PageTitle/PageTitle';
import UserAvatar from '../../elements/UserAvatar/UserAvatar';

type ResourceAction = 'show' | 'new' | 'edit' | 'destroy'

type ResourceButtons = {
  [key in ResourceAction]: ReactElement;
};

interface Props {
  workspace: Workspace
  back?: boolean
  actions?: ResourceAction[]
}

const WorkspaceHeader = ({
  workspace,
  back = false,
  actions = ['edit']
}: Props) => {
  const { t } = useLocale()

  const buttons: ResourceButtons = {
    new: <PrimaryLink {...manage.manage.workspace.new()}>{t('menu.new')}</PrimaryLink>,
    show: <PrimaryLink {...manage.manage.workspace.show(workspace.slug)}>{t('menu.show')}</PrimaryLink>,
    edit: <PrimaryLink {...manage.manage.workspace.edit(workspace.slug)}>{t('menu.edit')}</PrimaryLink>,
    destroy: <PrimaryLink href="?">{t('menu.destroy')}</PrimaryLink>,
  }

  const onBack = back ? { onBack: () => window.history.back() } : {}

  return (
    <>
      <PageTitle
        title={<>
          <UserAvatar name={workspace.name} size="default" src={workspace.image_url} />
          {' '}
          {workspace.name}
        </>}
        extra={actions.map(a => buttons[a])}
        {...onBack}
      >
      </PageTitle>
    </>)
}

export default WorkspaceHeader
