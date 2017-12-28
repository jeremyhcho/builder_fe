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
        return authorized ? (
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
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized,
  fetchingUser: auth.authState.fetchingUser
})

export default connect(
  mapStateToProps
)(UnauthorizedRoute)
