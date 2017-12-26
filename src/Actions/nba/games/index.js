import moment from 'moment'

import {
  FETCH_NBA_MATCHES,
  RECEIVE_NBA_MATCHES,
  PAGINATE_NBA_MATCHES,
  RECEIVE_PAGINATED_NBA_MATCHES
} from 'Constants'

export const fetchNBAMatches = (date) => {
  const now = moment(date)
  const from = moment(`${date} 21:00:00`).subtract(1, 'day')
  const to = moment(`${date} 20:59:59`).add(5, 'day')
  return ({
    type: FETCH_NBA_MATCHES,
    now,
    from,
    to
  })
}

export const paginateNBAMatches = (date, paginateType) => {
  let from
  let to

  if (paginateType === 'previous') {
    from = moment(`${date} 21:00:00`).subtract(4, 'days')
    to = moment(`${date} 20:59:59`).subtract(1, 'days')
  }
  if (paginateType === 'next') {
    from = moment(`${date} 21:00:00`)
    to = moment(`${date} 20:59:59`).add(3, 'days')
  }
  return ({
    type: PAGINATE_NBA_MATCHES,
    from,
    to,
    paginateType
  })
}

export const receiveNBAMatches = ({ data }) => ({
  type: RECEIVE_NBA_MATCHES,
  matches: data
})

export const receiveNBAPaginatedMatches = (data, paginateType) => ({
  type: RECEIVE_PAGINATED_NBA_MATCHES,
  matches: data,
  paginateType
})
