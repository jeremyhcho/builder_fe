import createRoutine from 'Routines'
import { sortBy } from 'lodash'

// Constants
import { FETCH_NBA_TEAMS } from 'Constants'

// Apis
import { getNBATeams } from 'Apis'

export const fetchNBATeams = createRoutine(
  FETCH_NBA_TEAMS,
  getNBATeams,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'teams'
    },
    transform: (response) => (
      sortBy(response, (team) => team.wins / team.losses).reverse()
    )
  }
)
