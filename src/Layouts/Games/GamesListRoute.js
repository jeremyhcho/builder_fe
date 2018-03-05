import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Redirect, Route } from 'react-router-dom'

// Components
import Games from 'Components/Games'

const GamesListRoute = ({ location }) => {
  const dateQueryRe = (dateQuery) => {
    // ?date=YYYY-MM-DD
    const re1 = '(\\?)'
    const re2 = '(date)'
    const re3 = '(=)'
    const re4 = '((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])'

    const dateRegexp = new RegExp(re1 + re2 + re3 + re4, ['i'])
    return dateRegexp.exec(dateQuery)
  }

  const todayDate = moment(moment().format('YYYY-MM-DD'))

  if (!dateQueryRe(location.search)) {
    return <Redirect to={{ pathname: 'games', search: `date=${todayDate._i}` }} />
  }

  return <Route exact path='/games' component={Games} />
}

GamesListRoute.propTypes = {
  location: PropTypes.object.isRequired
}

export default GamesListRoute
