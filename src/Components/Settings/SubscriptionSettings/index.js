import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import SubscriptionDetails from './SubscriptionDetails'
import CreateSubscription from './CreateSubscription'

// CSS
import './SubscriptionSettings.scss'

const SubscriptionSettings = ({ billing, fetchingSubscription }) => {
  if (fetchingSubscription) {
    return <div />
  }

  return (
    <div styleName="subscription-settings">
      {
        !Object.keys(billing).length ? (
          // Component to begin subscription process if user has not entered billing information
          <CreateSubscription />
        ) : (
          // Show subscription details and handle users who are customers but have not subscribed
          <SubscriptionDetails />
        )
      }
    </div>
  )
}

SubscriptionSettings.defaultProps = {
  billing: {},
  fetchingSubscription: false
}

SubscriptionSettings.propTypes = {
  billing: PropTypes.object,
  fetchingSubscription: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  billing: routines.billing,
  fetchingSubscription: routines.callingApi.FETCH_SUBSCRIPTION
})

export default connect(
  mapStateToProps
)(SubscriptionSettings)
