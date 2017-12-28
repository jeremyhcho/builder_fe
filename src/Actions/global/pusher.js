export const receivePusherNotification = ({ event, ...data }) => ({
  type: event,
  payload: data
})
