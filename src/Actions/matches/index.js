import {
  FETCH_NBA_MATCHES,
  RECEIVE_NBA_MATCHES
} from 'Constants'

export const fetchNBAMatches = (params) => ({
  type: FETCH_NBA_MATCHES,
  params
})

export const receiveNBAMatches = ({ data }) => ({
  type: RECEIVE_NBA_MATCHES,
  data
})
