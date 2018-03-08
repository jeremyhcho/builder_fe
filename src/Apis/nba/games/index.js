import moment from 'moment'
import { axios } from 'Apis'

export const getNBAGames = ({ now }) => {
  console.log(now)
  const from = moment.tz(`${now._i} 05:00`, 'America/New_York')
  const to = moment.tz(`${now._i} 04:59:59`, 'America/New_York').add(1, 'day')
  return axios.get('/api/nba/v1/matches', {
    params: {
      from,
      to
    }
  })
}


// from:"2018-03-07T05:00:00.000Z"
// to:"2018-03-08T04:59:59.000Z"
// Tue Mar 06 2018 21:00:00 GMT-0800 (PST) === Mar 07 12:00AM EST

// Wed Mar 07 2018 20:59:59 GMT-0800 (PST) === Mar 07 11:59:59PM EST
