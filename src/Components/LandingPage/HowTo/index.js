import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// CSS
import './HowTo.scss'

const HowTo = ({ history, authorized }) => {
  const routeToModel = () => {
    if (authorized) {
      return history.push({ pathname: '/models', state: { from: '/' } })
    }

    return history.push({ pathname: '/auth/login', state: { from: '/' } })
  }

  return (
    <section styleName="how-to">
      <div styleName="col-1000">
        <div styleName='left'>
          <img
            src="https://s3-us-west-1.amazonaws.com/builder-api/data_exports/assets/macbook_pro.jpg"
            style={{
              maxHeight: '100%',
              position: 'absolute',
              right: '0'
            }}
          />
        </div>

        <div styleName="right">
          <header styleName="header">
            The phone. Bringing you closer to people... who have phones
          </header>

          <p styleName="description">
            Bagels and donuts. Round food..for every mood.
          </p>

          <button styleName="action flat" onClick={routeToModel}>
            Create a model
          </button>
        </div>
      </div>
    </section>
  )
}

HowTo.propTypes = {
  history: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized
})

export default withRouter(connect(
  mapStateToProps
)(HowTo))
