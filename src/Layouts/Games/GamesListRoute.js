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
  const todayDate = moment().format('YYYY-MM-DD')

  if (!getDateQuery(location.search)) {
    updateNBAGames(todayDate)
    return <Redirect to={{ pathname: '/games', search: `date=${todayDate}`, state: { from: 'sidenav' } }} />
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
