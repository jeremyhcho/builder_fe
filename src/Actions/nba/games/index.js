import moment from 'moment'

import {
  FETCH_NBA_GAMES,
  FETCH_NBA_GAMES_SUCCESS,
  PAGINATE_NBA_GAMES,
  PAGINATE_NBA_GAMES_SUCCESS
} from 'Constants'

export const fetchNBAGames = (date) => {
  const now = moment(date)
  const from = moment(`${date} 21:00:00`).subtract(1, 'day')
  const to = moment(`${date} 20:59:59`).add(5, 'day')
  return ({
    type: FETCH_NBA_GAMES,
    now,
    from,
    to
  })
}

export const paginateNBAGames = (date, paginateType) => {
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
