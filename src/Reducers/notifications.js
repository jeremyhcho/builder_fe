import {
  FETCH_NOTIFICATIONS_SUCCESS,
  UPDATE_READ_NOTIFICATIONS
} from 'Constants'

const initialState = {
  notifications: [],
  unreadCount: 0
}

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.notifications.data,
        unreadCount: action.notifications.data.filter(notification =>
          !notification.is_read
        ).length
      }

    case UPDATE_READ_NOTIFICATIONS:
      return {
        ...state,
        unreadCount: 0,
        notifications: state.notifications.map(notification => ({
          ...notification,
          is_read: true
        }))
      }

    default:
      return state
  }
}

export default notificationsReducer
