import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const UnauthorizedRoute = ({ component: Component, authorized, fetchingUser, ...rest }) => {
  if (fetchingUser) {
    return <div />
  }

  return (
    <Route
      {...rest}
      render={componentProps => {
        return authorized ? (
          <Redirect to='/' />
        ) : (
          <Component {...componentProps} />
        )
      }}
    />
  )
}

UnauthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  fetchingUser: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized,
  fetchingUser: auth.authState.fetchingUser
})

export default connect(
  mapStateToProps
)(UnauthorizedRoute)
