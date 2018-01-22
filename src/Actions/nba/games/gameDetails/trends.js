// Constants
import {
  FETCH_NBA_PREDICTABILITY
} from 'Constants'

export const fetchNBAPredictability = (matchId) => ({
  type: FETCH_NBA_PREDICTABILITY,
  matchId
})
