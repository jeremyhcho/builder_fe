import {
  FETCH_NBA_MATCHES
} from 'Constants'

export const fetchNBAMatches = (params) => ({
  type: FETCH_NBA_MATCHES,
  params
})
