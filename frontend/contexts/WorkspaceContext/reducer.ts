// import { WorkspaceState, AutheticationAction } from './types';

const initialState: WorkspaceState = {
  status: 'FAILED',
  currentWorkspace: null,
  workspaces: [],
};

function reducer(value: WorkspaceState, action: FetchAction): WorkspaceState {
  switch (action.type) {

    case 'UPDATE_WORKSPACES': {
      const { workspaces } = action.payload;
      return {
        ...value,
        status: 'SUCCEED',
        workspaces
      };
    }
    case 'SET_CURRENT_WORKSPACE': {
      const { currentWorkspace } = action.payload;
      return {
        ...value,
        status: 'SUCCEED',
        currentWorkspace
      };
    }
    case 'CLEAR_WORKSPACE':
      return {
        ...value,
        status: 'FAILED',
        currentWorkspace: null,
        workspaces: [],
      };


    default:
      return value;
  }
}

export { initialState, reducer };
