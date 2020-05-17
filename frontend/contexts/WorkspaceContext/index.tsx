import React, { createContext, useReducer, useMemo, useEffect, useContext } from 'react'
import api, { getHeaders } from 'utils/http'
import { initialState, reducer } from './reducer'
import UserContext from '../UserContext'
import { useRouter } from 'next/router'

const defaultValue: WorkspaceContextValue = {
  ...initialState,
  refresh: () => {},
  changeWorkspace: (wid) => {},
  fetchWorkspace: (wid) => {},
}

interface WorkspaceProviderProps {
  children: React.ReactNode
}

const WorkspaceContext = createContext(defaultValue)

const WorkspaceProvider: React.FC<WorkspaceProviderProps> = (props) => {
  const [workspace, dispatch] = useReducer(reducer, initialState)
  const { currentUser } = useContext(UserContext)
  const { query } = useRouter()

  // Fetch workspaces infos each time the user changes
  useEffect(() => {
    refresh()
  }, [currentUser])

  // Set active workspace each time the route change
  useEffect(() => {
    if (query.workspace_id) {
      console.info(`Setting workspace to ${query.workspace_id} (${workspace.workspaces?.length})`);
      
      changeWorkspace(`${query.workspace_id}`)
    }
  }, [workspace.workspaces?.length, query.workspace_id])

  const fetchWorkspace = async (workspace_id: string | number) => {
    const headers = getHeaders(currentUser?.jwt)

    console.info(`Fetching workspace to ${workspace_id}`);
    try {
      const { data, status, statusText } = await api<Workspace>(`/api/workspaces/${workspace_id}`, { headers })
      return data
    } catch (error) {
      console.warn("Invalid auth", { error })
    }
  }

  const changeWorkspace = async (workspace_id: string | number) => {
    const currentWorkspace = await fetchWorkspace(workspace_id)
    // const currentWorkspace = workspace.workspaces.filter((w) =>
    //   w.id.toString() === workspace_id || w.slug === workspace_id
    // )[0]

    if (currentWorkspace) {
      dispatch({
        type: 'SET_CURRENT_WORKSPACE',
        payload: { currentWorkspace }
      })
    }
  }

  /**
   * Will fetch the infos for the workspaces
   */
  const refresh = async () => {
    if (!currentUser) {
      dispatch({
        type: 'CLEAR_WORKSPACE'
      })
    } else {
      dispatch({
        type: 'UPDATE_WORKSPACES',
        payload: { workspaces: currentUser.workspaces }
      })
    }
  }

  const value = useMemo(
    () => ({ ...workspace, refresh, changeWorkspace, fetchWorkspace }),
    [workspace, refresh, changeWorkspace, fetchWorkspace],
  )

  return <WorkspaceContext.Provider value={value}>{props.children}</WorkspaceContext.Provider>
}

WorkspaceProvider.displayName = 'WorkspaceProvider'

export { WorkspaceProvider }
export default WorkspaceContext
