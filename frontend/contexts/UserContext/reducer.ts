// import { UserState, AutheticationAction } from './types';
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

const initialState: UserState = {
  status: 'NOT_AUTHENTICATED',
  currentUser: null
};

function reducer(value: UserState, action: AuthenticationAction): UserState {
  switch (action.type) {

    case 'AUTHENTICATION_SUCCESS': {
      const { user } = action.payload;
      return {
        ...value,
        status: 'SUCCEED',
        currentUser: user
      };
    }
    case 'USER_REFRESH': {
      const { user } = action.payload;
      return {
        ...value,
        status: 'SUCCEED',
        currentUser: user
      };
    }
    case 'AUTHENTICATION_FAIL':
      return {
        ...value,
        status: 'FAILED',
        currentUser: null,
      };

    case 'RESET_AUTHENTICATION_ERROR':
      return {
        ...value,
        status: 'NOT_AUTHENTICATED',
        currentUser: null,
      };

    case 'LOGOUT':
      return {
        ...value,
        status: 'NOT_AUTHENTICATED',
        currentUser: null,
      };

    default:
      return value;
  }
}

export { initialState, reducer };
