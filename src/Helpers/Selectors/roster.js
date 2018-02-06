import { createSelector } from 'reselect'
// import { sortBy } from 'lodash'

const getRoster = (routines) => routines.nba.teamRoster

const makeGetModelPredictions = () => {
  return createSelector(
    getRoster,
    (roster) => {
      if (!roster) return []

      const position = {
        PG: 1000,
        SG: 500,
        SF: 100,
        PF: 50,
        C: 1
      }

      return roster.sort((a, b) => {
        if (position[b.primary_position] > position[a.primary_position]) {
          return 1
        } else if (position[b.primary_position] < position[a.primary_position]) {
          return -1
        }

        return a.last_name.toLowerCase() > b.last_name.toLowerCase()
      })
    }
  )
}

export default makeGetModelPredictions
