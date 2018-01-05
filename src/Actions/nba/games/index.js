import moment from 'moment'

import {
  FETCH_NBA_GAMES,
  FETCH_NBA_GAMES_SUCCESS,
  PAGINATE_NBA_GAMES,
  PAGINATE_NBA_GAMES_SUCCESS
} from 'Constants'

export const fetchNBAGames = (date) => {
  const now = moment(date)
  let to
  // beginning of current date in EST
  const from = moment(`${date} 21:00:00`).subtract(1, 'day')
  // end of specified date
  to = moment(`${date} 20:59:59`).add(1, 'day')
  if (now.diff(moment().add(1, 'day'), 'days') === 0) {
    // if date selected is   tomorrow's games, don't fetch more games
    to = moment(`${date} 20:59:59`)
  }

  return ({
    type: FETCH_NBA_GAMES,
    now,
    from,
    to
  })
}

export const paginateNBAGames = (date, paginateType) => {
  const tomorrow = moment().add(1, 'days')
  const maxDiff = moment(date).add(3, 'days').diff(tomorrow, 'days')
  let from
  let to

  if (paginateType === 'previous') {
    from = moment(`${date} 21:00:00`).subtract(4, 'days')
    to = moment(`${date} 20:59:59`).subtract(1, 'days')
  }

  if (paginateType === 'next') {
    from = moment(`${date} 21:00:00`)
    to = moment(`${date} 20:59:59`).add(3, 'days')
  }

  if (maxDiff >= 0 && paginateType === 'next') {
    // Prevents pagination from loading tomorrow's games
    to = moment(`${tomorrow.format('YYYY-MM-DD')} 20:59:59`)
  }

  return ({
    type: PAGINATE_NBA_GAMES,
    from,
    to,
    paginateType
  })
}

export const fetchNBAGamesSuccess = (games) => ({
  type: FETCH_NBA_GAMES_SUCCESS,
  games
})

export const paginateNBAGamesSuccess = (games, paginateType) => ({
  type: PAGINATE_NBA_GAMES_SUCCESS,
  games,
  paginateType
})
