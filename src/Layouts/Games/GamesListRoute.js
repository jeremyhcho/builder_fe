import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Redirect, Route } from 'react-router-dom'

// Components
import Games from 'Components/Games'

// Helpers
import { getDateQuery } from 'Helpers'

// Actions
import { updateNBAGames } from 'Actions'

const GamesListRoute = ({ location, updateNBAGames }) => {
  const todayDate = moment(moment().format('YYYY-MM-DD'))

  const getFromAndTo = (date) => {
    const now = moment(date)
    // beginning of current date in EST
    const from = moment(`${date} 21:00:00`).subtract(1, 'day')
    // end of specified date
    const to = moment(`${date} 20:59:59`)

    return { now, from, to }
  }

  if (!getDateQuery(location.search)) {
    updateNBAGames(getFromAndTo(todayDate._i))
    return <Redirect to={{ pathname: '/games', search: `date=${todayDate._i}`, state: { from: 'sidenav' } }} />
  }

  return <Route exact path='/games' component={Games} />
}

GamesListRoute.propTypes = {
  location: PropTypes.object.isRequired,
  updateNBAGames: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateNBAGames
}

export default connect(
  null,
  mapDispatchToProps
)(GamesListRoute)
