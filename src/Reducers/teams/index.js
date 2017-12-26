// Constants
import { RECEIVE_NBA_TEAMS } from 'Constants'

// Lodash
import { sortBy } from 'lodash'

const initialState = {
  teams: []
}

const nbaTeams = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NBA_TEAMS:
      return {
        ...state,
        teams: sortBy(action.teams.data, (team) => team.wins / team.losses).reverse()
      }

    default:
      return state
  }
}

export default nbaTeams
