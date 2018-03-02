import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { get } from 'lodash'

const UnauthorizedRoute = ({
  component: Component,
  location,
  authorized,
  fetchingUser,
  user,
  ...rest
}) => {
  if (fetchingUser) {
    return <div />
  }

  const redirectUrl = get(location, 'state.from.pathname', '/')

  return (
    <Route
      {...rest}
      render={componentProps => {
        if (location.pathname === '/auth/verify') {
          return <Component {...componentProps} />
        }

        return user.id ? (
          <Redirect to={redirectUrl === '/' ? '/dashboard' : `${redirectUrl}${location.state.from.search}`} />
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
  fetchingUser: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized,
  fetchingUser: auth.authState.fetchingUser,
  user: auth.authState.user
})

export default connect(
  mapStateToProps
)(UnauthorizedRoute)
