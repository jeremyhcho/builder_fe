import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Components

// CSS
import './Closer.scss'

const Closer = ({ authorized, history }) => {
  const routeToSignup = () => {
    if (authorized) {
      return history.push({ pathname: '/dashboard', state: { from: '/' } })
    }

    return history.push({ pathname: '/auth/signup', state: { from: '/' } })
  }

  return (
    <section styleName="closer">
      <div styleName="col-1000">
        <div styleName="content">
          <header styleName="header">
            Take your hobby to the next level.
          </header>

          <button styleName="action blue" onClick={routeToSignup}>
            Open your free beta account
          </button>

          <div styleName='version'>
            Beta v1.1.5
          </div>
        </div>
      </div>
    </section>
  )
}

Closer.propTypes = {
  history: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized
})

export default withRouter(connect(
  mapStateToProps
)(Closer))
