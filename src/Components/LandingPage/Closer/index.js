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
            Pants. Like shorts, but longer.
          </header>

          <button styleName="action blue" onClick={routeToSignup}>
            Start free trial now
          </button>

          <div styleName='version'>
            Version alpha - 0.9.0
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
