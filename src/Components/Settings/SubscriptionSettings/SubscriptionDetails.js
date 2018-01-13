import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// Components
import EditSubscription from './EditSubscription'
import SettingsSubSection from '../Blocks/SettingsSubSection'
import planFactory from '../Blocks/planFactory'

// Icons
import AlertIcon from 'Assets/Icons/settings/alert.svg'

const subscriptionSection = {
  lineHeight: '20px'
}

class SubscriptionDetails extends React.Component {
  state = {
    showPlans: false
  }

  toggleShowPlans = () => {
    this.setState({ showPlans: !this.state.showPlans })
  }

  renderSubscriptionDetails () {
    const { subscription } = this.props

    // Customer that is currently subscribed to a plan
    if (subscription) {
      return (
        <div style={subscriptionSection}>
          <p>You are currently subscribed to our {subscription.plan.name.toLowerCase()}</p>
          <p>Subscribed since {moment.unix(subscription.created).format('MMM DD, YYYY')}</p>
          <p>Next payment date: {moment.unix(subscription.current_period_end).format('MMM DD, YYYY')}</p>
          <p style={{ marginTop: '25px' }} className="label">
            Click {' '}
            <span
              className="link"
              onClick={this.toggleShowPlans}
            >
              here
            </span>
            {' '} if you want to subscribe to a different plan or cancel your current subscription.
          </p>
        </div>
      )
    }

    // Customer that is not subscribed to a plan
    return (
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <AlertIcon style={{ marginBottom: '10px', opacity: '0.7' }} />
        <p>You are not subscribed to any plans on your Quartz account.</p>
        <p>
          Click {' '}
          <span
            className="link"
            onClick={this.toggleShowPlans}
          >
            here
          </span>
          {' '} to get started and subscribe to a plan.
        </p>
      </div>
    )
  }
  render () {
    const { subscription } = this.props

    if (this.state.showPlans) {
      return <EditSubscription toggle={this.toggleShowPlans} />
    }

    return (
      <div>
        <SettingsSubSection label="Your subscriptions">
          {this.renderSubscriptionDetails()}
        </SettingsSubSection>

        {
          subscription &&
          <SettingsSubSection label="Plan details" subText={subscription.plan.name}>
            <div style={subscriptionSection}>
              {
                planFactory[subscription.plan.id].features.map(feature => (
                  <p key={feature}>{feature}</p>
                ))
              }
            </div>
          </SettingsSubSection>
        }

        <SettingsSubSection label="Payment history">
          <p className="label">Under construction</p>
        </SettingsSubSection>
      </div>
    )
  }
}

SubscriptionDetails.defaultProps = {
  subscription: null
}

SubscriptionDetails.propTypes = {
  subscription: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({
  subscription: auth.authState.user.subscription
})

export default connect(
  mapStateToProps
)(SubscriptionDetails)
