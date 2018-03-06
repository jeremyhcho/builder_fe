import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Redirect, Route } from 'react-router-dom'

// Components
import Games from 'Components/Games'

// Helpers
import { getDateQuery } from 'Helpers'

const GamesListRoute = ({ location }) => {
  const todayDate = moment(moment().format('YYYY-MM-DD'))

  if (!getDateQuery(location.search)) {
    return <Redirect to={{ pathname: 'games', search: `date=${todayDate._i}`, state: { from: 'sidenav' } }} />
  }

  return <Route exact path='/games' component={Games} />
}

GamesListRoute.propTypes = {
  location: PropTypes.object.isRequired
}

export default GamesListRoute
