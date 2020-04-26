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
  tree?: (string | ReactElement)[]
  back?: boolean
  actions?: ResourceAction[]
}

const WorkspaceHeader = ({
  workspace,
  tree = [],
  back = false,
  actions = ['edit']
}: Props) => {
  const { t } = useLocale()

  const renderTree = (elt: string | ReactElement) => {
    return <>
      <span style={{padding: '0 5px', color: '#ccc'}}>{' / '}</span>
      {elt}
    </>
  }

  const buttons: ResourceButtons = {
    new: <PrimaryLink {...manage.manage.workspace.new()}>{t('menu.new')}</PrimaryLink>,
    show: <PrimaryLink {...manage.manage.workspace.show(workspace.slug)}>{t('menu.show')}</PrimaryLink>,
    edit: <PrimaryLink {...manage.manage.workspace.edit(workspace.slug)}>{t('menu.edit')}</PrimaryLink>,
    destroy: <PrimaryLink href="?">{t('menu.destroy')}</PrimaryLink>,
  }

  const onBack = back ? { onBack: () => window.history.back() } : {}

  return (
    <header className="WorkspaceHeader">
      <PageTitle
        title={<>
          <UserAvatar name={workspace.name} size="default" src={workspace.image_url} />
          {' '}
          {workspace.name}
          {tree.map(renderTree)}
        </>}
        extra={actions.map(a => buttons[a])}
        {...onBack}
      >
      </PageTitle>
    </header>)
}

export default WorkspaceHeader
