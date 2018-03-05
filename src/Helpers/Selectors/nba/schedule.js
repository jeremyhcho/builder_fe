import { createSelector } from 'reselect'
import { groupBy } from 'lodash'
import moment from 'moment'

const getSchedule = (routines) => routines.nba.teamSchedule

const makeGroupedSchedule = () => {
  return createSelector(
    getSchedule,
    (schedule) => {
      if (!schedule) return {}

      const groupedSchedule = groupBy(schedule,
        match => moment(new Date(match.date)).format('MMMM'))

      const sortedMonths = Object.keys(groupedSchedule).sort(
        (a, b) => moment(new Date(groupedSchedule[a][0].date))
          .diff(moment(new Date(groupedSchedule[b][0].date))))

      const sortedSchedule = {}
      sortedMonths.forEach(
        month => sortedSchedule[month] = groupedSchedule[month]
      )

      return sortedSchedule
    }
  )
}

export default makeGroupedSchedule
