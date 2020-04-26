import React, { createContext, useReducer, useMemo, useEffect } from 'react'
import api, { getHeaders } from '../../utils/http'
import { initialState, reducer } from './reducer'

const defaultValue: UserContextValue = {
  ...initialState,
  check: () => {},
  refreshNotifications: () => {},
  update: (attributes: UserUpdateValues) => Promise.resolve(undefined),
}

interface UserProviderProps {
  token?: string
  children: React.ReactNode
}

const UserContext = createContext(defaultValue)

const UserProvider: React.FC<UserProviderProps> = (props) => {
  const [user, dispatch] = useReducer(reducer, initialState)
    
  // Fetch user infos each time the token changes
  useEffect(() => {
    check()
  }, [props.token])

  /**
   * Will fetch the infos for the user associted with
   * our access token.
   */
  const check = async () => {

    if (!props.token) {
      return
    }

    const headers = getHeaders(props.token)

    try {
      const { data, status, statusText } = await api<AuthedUser>('/api/me', { headers })

      if (status < 300) {
        dispatch({
          type: 'AUTHENTICATION_SUCCESS',
          payload: { user: { ...data, jwt: props.token } }
        })
        await refreshNotifications()
      } else {
        console.error({ data, status, statusText })
        dispatch({ type: 'AUTHENTICATION_FAIL' })
      }
    } catch (error) {
      console.warn("Invalid auth", { error })
    }
  }

  /**
   * Will fetch the notifications
   */
  const refreshNotifications = async () => {

    if (!props.token) {
      return 
    }
    
    const headers = getHeaders(props.token)

    try {
      const { data, status, statusText } = await api<UserNotification>(`/api/me/notifications`, { headers })

      if (status < 300) {
        dispatch({
          type: 'NOTIFICATION_UDPATE',
          payload: { notifications: data }
        })
      } else {
        console.error({ data, status, statusText })
        // dispatch({ type: 'AUTHENTICATION_FAIL' })
      }
    } catch (error) {
      console.warn("Invalid auth", { error })
    }
  }

  const update = async (attributes: UserUpdateValues): Promise<AuthedUser | undefined> => {
    if (!user.currentUser) {
      throw new Error('Not logged');
    }

    const headers = getHeaders(props.token)
    const { data, status } = await api<AuthedUser>(
      `/api/users/${user.currentUser.id}`,
      { headers, data: { user: attributes }, method: 'PATCH' }
    )

    if (status < 300) {
      dispatch({
        type: 'USER_REFRESH',
        payload: { user: { ...data, jwt: props.token } }
      })
    }
    return data
  }

  const value = useMemo(
    () => ({ ...user, check, update, refreshNotifications }),
    [user, check, update, refreshNotifications],
  )

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

UserProvider.displayName = 'UserProvider'

export { UserProvider }
export default UserContext
