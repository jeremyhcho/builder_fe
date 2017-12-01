import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthorizedRoute = ({ component: Component, authorized, ...rest }) => (
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

AuthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired
}

const mapStateToProps = () => ({
  authorized: false
})

export default connect(
  mapStateToProps
)(AuthorizedRoute)
