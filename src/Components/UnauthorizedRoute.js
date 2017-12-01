import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const UnauthorizedRoute = ({ component: Component, authorized, ...rest }) => (
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

UnauthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired
}

const mapStateToProps = () => ({
  authorized: false
})

export default connect(
  mapStateToProps
)(UnauthorizedRoute)