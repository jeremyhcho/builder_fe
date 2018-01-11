import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import Subscription from './Subscription'
import CreateSubscription from './CreateSubscription'

// CSS
import './SubscriptionSettings.scss'

class SubscriptionSettings extends React.Component {
  render () {
    const { billing } = this.props

    return (
      <div styleName="subscription-settings">
        {
          !Object.keys(billing).length ? (
            <CreateSubscription />
          ) : (
            <Subscription />
          )
        }
      </div>
    )
  }
}

SubscriptionSettings.defaultProps = {
  billing: {}
}

SubscriptionSettings.propTypes = {
  billing: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({
  billing: auth.authState.user.billing
})

export default connect(
  mapStateToProps
)(SubscriptionSettings)
