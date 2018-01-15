// Constants
import {
  FETCH_NBA_LINES
} from 'Constants'

export const fetchNBALines = (matchId) => ({
  type: FETCH_NBA_LINES,
  matchId
})
