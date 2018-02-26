import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// Components
import LandingPageLayout from 'Layouts/LandingPage'
import HelpLayout from 'Layouts/Help'

const AuthorizedRoute = ({ component: Component, authorized, user, ...rest }) => {
  if (location.pathname === '/') {
    return (
      <LandingPageLayout {...rest} />
    )
  }

  if (location.pathname.includes('/help')) {
    return (
      <HelpLayout {...rest} />
    )
  }

  return (
    <Route
      {...rest}
      render={componentProps => {
        return authorized ? (
          <Component {...componentProps} />
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { from: componentProps.location } }} />
        )
      }}
    />
  )
}

AuthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized,
  user: auth.authState.user
})

export default connect(
  mapStateToProps
)(AuthorizedRoute)
