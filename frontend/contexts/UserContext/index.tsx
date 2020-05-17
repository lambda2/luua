import React, { createContext, useReducer, useMemo, useEffect } from 'react'
import api, { getHeaders } from 'utils/http'
import { initialState, reducer } from './reducer'
import { read, readAll } from 'api/notification'

const defaultValue: UserContextValue = {
  ...initialState,
  check: () => {},
  refreshNotifications: () => {},
  readNotification: (notification_id: number | string) => {},
  readAllNotifications: () => {},
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
      dispatch({ type: 'AUTHENTICATION_FAIL' })
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
      const { data, status, statusText } = await api<UserNotification>(`/api/me/notifications?unread=true`, { headers })

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

  /**
   * Read a notification
   */
  const readNotification = async (notification_id: number | string) => {

    if (!props.token) {
      return
    }

    try {
      const { data, status, statusText } = await read(notification_id, props.token)

      if (status < 300) {
        dispatch({
          type: 'READ_NOTIFICATION',
          payload: { notification: data }
        })
      } else {
        console.error({ data, status, statusText })
      }
    } catch (error) {
      console.warn("Invalid auth", { error })
    }
  }

  /**
   * Read all notifications
   */
  const readAllNotifications = async () => {

    if (!props.token) {
      return
    }

    try {
      const { data, status, statusText } = await readAll(props.token)

      if (status < 300) {
        dispatch({
          type: 'NOTIFICATION_UDPATE',
          payload: { notifications: data }
        })
      } else {
        console.error({ data, status, statusText })
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
    () => ({ ...user, check, update, refreshNotifications, readNotification, readAllNotifications }),
    [user, check, update, refreshNotifications, readNotification, readAllNotifications],
  )

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

UserProvider.displayName = 'UserProvider'

export { UserProvider }
export default UserContext
