// import { UserState, AutheticationAction } from './types';
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import update from 'immutability-helper';

const initialState: UserState = {
  status: 'NOT_AUTHENTICATED',
  currentUser: null,
  notifications: []
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
    case 'NOTIFICATION_UDPATE': {
      const { notifications } = action.payload;
      return {
        ...value,
        notifications
      };
    }
    case 'READ_NOTIFICATION': {
      const { notification } = action.payload;
      return {
        ...value,
        notifications: value.notifications.filter(n => n.id !== notification.id)
      }
    }
    // case 'READ_NOTIFICATION': {
    //   const { notification } = action.payload;
    //   const toUpdate = find(value.notifications, ['id', notification.id])
    //   const index = findIndex(value.notifications, ['id', notification.id])
    //   if (toUpdate) {
    //     return update(value, { notifications: { [index]: { $merge: notification } } });
    //   } else {
    //     console.warn("Failed to update");
    //     return value
    //   }
    // }
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
