import {
  FETCH_NBA_MATCHES,
  RECEIVE_NBA_MATCHES
} from 'Constants'

export const fetchNBAMatches = ({ now, from, to }) => ({
  type: FETCH_NBA_MATCHES,
  now,
  from,
  to
})

export const receiveNBAMatches = ({ data }) => ({
  type: RECEIVE_NBA_MATCHES,
  data
})
