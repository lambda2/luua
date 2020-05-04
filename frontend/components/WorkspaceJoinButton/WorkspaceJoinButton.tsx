import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useLocale } from '../../hooks/useLocale';
import { apply } from '../../api/mission';
import { Button } from 'antd';
import ErrorBox from '../../elements/ErrorBox/ErrorBox';
import checkCustomRoutes from 'next/dist/lib/check-custom-routes';
import MessageBox from '../../elements/MessageBox/MessageBox';
import { requestToJoin } from '../../api/workspace';
import find from 'lodash/find';

interface Props {
  workspace: LightWorkspace
  user?: AuthedUser | null
}

const WorkspaceJoinButton = ({
  workspace,
  user,
}: Props) => {

  const { membership, slug, id } = workspace
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const { t } = useLocale()

  const sendJoinRequest = async () => {
    setLoading(true)
    try {
      const request = await requestToJoin(slug || id, user?.jwt || '')
      console.log({ request });
      
      setLoading(false)
      setError(null)
      setSuccess(true)
    } catch (error) {
      setError(error)
      setLoading(false)
      setSuccess(false)
    }
  }

  if (!user) {
    return <></>
  }

  const activeUser = find(user.workspace_users, { workspace_id: id })

  if (activeUser) {
    return <Button disabled>{activeUser.admin ? t(`workspace.admin`) : t(`workspace.member`)}</Button>
  }

  const activeRequest = find(user.workspace_requests, { workspace_id: id})

  if (activeRequest) {
    return <Button disabled>{t(`workspace_request.status.${activeRequest.status}`)}</Button>
  }

  if (membership === 'closed') {
    return <Button disabled>{t('workspace.membership.closed.button')}</Button>
  }

  return (
    <Button loading={loading} disabled={success} onClick={sendJoinRequest}>
      {!loading && !error && !success && t(`workspace.membership.${membership}.button`)}
      {loading && 'loading'}
      {error && 'error'}
      {success && (membership === 'approval' ? t('workspace_request.status.pending') : t('workspace_request.status.accepted'))}
    </Button>
  )

}

export default WorkspaceJoinButton