import moment from 'moment'

import {
  FETCH_NBA_MATCHES,
  RECEIVE_NBA_MATCHES
} from 'Constants'

export const fetchNBAMatches = (date) => {
  const now = moment(date)
  const from = moment(`${date} 21:00:00`).subtract(1, 'day')
  const to = moment(`${date} 20:59:59`).add(2, 'day')
  return ({
    type: FETCH_NBA_MATCHES,
    now,
    from,
    to
  })
}

export const receiveNBAMatches = ({ data }) => ({
  type: RECEIVE_NBA_MATCHES,
  data
})
