import { createSelector } from 'reselect'
import moment from 'moment'

const getSeconds = (duration) => {
  // duration format: "8:51"
  return moment.duration({
    minutes: duration.slice(0, duration.indexOf(':')),
    seconds: duration.slice(duration.indexOf(':') + 1)
  }).asSeconds()
}

const sortTeam = (playersList, sortingKey) => {
  const { stat, ascending } = sortingKey

  const activePlayers = playersList.filter(player => player.statistics.minutes !== '00:00')
  const inactivePlayers = playersList.filter(player => player.statistics.minutes === '00:00')

  if (ascending) {
    activePlayers.sort((a, b) => {
      if (stat === 'minutes') {
        return getSeconds(b.statistics[stat]) - getSeconds(a.statistics[stat])
      }
      return b.statistics[stat] - a.statistics[stat]
    })

    return [...activePlayers, ...inactivePlayers]
  }

  activePlayers.sort((a, b) => {
    if (stat === 'minutes') {
      return getSeconds(a.statistics[stat]) - getSeconds(b.statistics[stat])
    }

    return a.statistics[stat] - b.statistics[stat]
  })

  return [...activePlayers, ...inactivePlayers]
}

const getSortStatsKey = ({ nba }) => {
  return nba.sortStatsKey
}

const getPlayerStats = ({ routines }) => {
  return routines.nba.playerStats
}

const makeSortPlayerStats = () => {
  return createSelector(
    [getSortStatsKey, getPlayerStats],
    (sortStatsKey, playerStats) => {
      if (!playerStats) return null

      const sortedTeamPlayers = {
        away: {
          starter: sortTeam(playerStats.away.filter(player => player.starter),
            sortStatsKey.away.starter),
          bench: sortTeam(playerStats.away.filter(player => !player.starter),
            sortStatsKey.away.bench)
        },
        home: {
          starter: sortTeam(playerStats.home.filter(player => player.starter),
            sortStatsKey.home.starter),
          bench: sortTeam(playerStats.home.filter(player => !player.starter),
            sortStatsKey.home.bench)
        }
      }

      return { away: sortedTeamPlayers.away, home: sortedTeamPlayers.home }
    }
  )
}

export default makeSortPlayerStats
