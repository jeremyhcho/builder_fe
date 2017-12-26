// Constants
import { FETCH_NBA_TEAMS_SUCCESS } from 'Constants'

// Lodash
import { sortBy } from 'lodash'

const initialState = {
  teamsList: []
}

const teams = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NBA_TEAMS_SUCCESS:
      return {
        ...state,
        teamsList: sortBy(action.teams.data, (team) => team.wins / team.losses).reverse()
      }

    default:
      return state
  }
}

export default teams
