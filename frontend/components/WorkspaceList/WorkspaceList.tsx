import React, { useContext } from 'react';
import Link from 'next/link';
import UserContext from '../../contexts/UserContext';

interface Props {
  data?: LightWorkspace[]
}

const WorkspaceList = ({ data }: Props) => {

  const { currentUser } = useContext(UserContext)

  return (
  <>
      {data && data.map(o => <div key={o.id}>
        <Link href={`/manage/[workspace_id]`} as={`/manage/${o.slug}`}>
          <a>
            <h2>{o.name}</h2>
            <p>{o.missions_count} Missions · {o.users_count} Users</p>
          </a>
        </Link>
      </div>)}
  </>)
}

export default WorkspaceList