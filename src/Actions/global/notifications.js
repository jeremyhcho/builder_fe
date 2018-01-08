import {
  FETCH_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  UPDATE_READ_NOTIFICATIONS
} from 'Constants'

export const fetchNotifications = () => ({
  type: FETCH_NOTIFICATIONS
})

export const readNotifications = () => ({
  type: READ_NOTIFICATIONS
})

export const updateReadNotifications = () => ({
  type: UPDATE_READ_NOTIFICATIONS
})
