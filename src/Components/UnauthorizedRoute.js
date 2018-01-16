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
        return (user.is_verified || (authorized && !user.is_verified)) ? (
          <Redirect to={redirectUrl} />
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
