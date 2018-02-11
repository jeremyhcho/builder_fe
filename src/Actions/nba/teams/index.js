import { createRoutine } from 'Routines'
import { sortBy } from 'lodash'

// Constants
import { FETCH_NBA_TEAMS } from 'Constants'

// Apis
import { getNBATeams } from 'Apis'

export const fetchNBATeams = createRoutine({
  prefix: FETCH_NBA_TEAMS,
  api: getNBATeams,
  reducerKey: ['nba', 'teams'],
  transform: (response) => (
    sortBy(response, (team) => team.wins / team.losses).reverse()
  )
})
