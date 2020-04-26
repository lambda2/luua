declare type FetchStatus = 'FAILED' | 'SUCCEED';

declare interface WorkspaceState {
  status: FetchStatus;
  currentWorkspace: Workspace | null;
  workspaces: LightWorkspace[];
}

declare interface WorkspaceContextValue extends WorkspaceState {
  refresh: () => void;
  changeWorkspace: (workspace_id: string | number) => void;
  fetchWorkspace: (workspace_id: string | number) => void;
}

declare type UpdateWorkspacesAction = {
  type: 'UPDATE_WORKSPACES';
  payload: {
    workspaces: LightWorkspace[];
  };
};
declare type SetCurrentWorkspaceAction = {
  type: 'SET_CURRENT_WORKSPACE';
  payload: {
    currentWorkspace: Workspace;
  };
};
declare type ClearWorkspaceAction = {
  type: 'CLEAR_WORKSPACE';
};

declare type FetchAction =
  | UpdateWorkspacesAction
  | SetCurrentWorkspaceAction
  | ClearWorkspaceAction

