import moment from 'moment'

import {
  FETCH_NBA_GAMES,
  FETCH_NBA_GAMES_SUCCESS
} from 'Constants'

export const fetchNBAGames = (date) => {
  const now = moment(date)
  // beginning of current date in EST
  const from = moment(`${date} 21:00:00`).subtract(1, 'day')
  // end of specified date
  const to = moment(`${date} 20:59:59`) /* moment(`${date} 20:59:59`).add(1, 'day') */
  // if (now.diff(moment().add(1, 'day'), 'days') === 0) {
  //   // if date selected is tomorrow's games, don't fetch any more games
  //   to = moment(`${date} 20:59:59`)
  // }

  return ({
    type: FETCH_NBA_GAMES,
    now,
    from,
    to
  })
}

export const fetchNBAGamesSuccess = (games) => ({
  type: FETCH_NBA_GAMES_SUCCESS,
  games
})
