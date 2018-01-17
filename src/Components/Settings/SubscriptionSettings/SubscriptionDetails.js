import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import EditSubscription from './EditSubscription'
import CanceledSubscriptions from './CanceledSubscriptions'
import SettingsSubSection from '../Blocks/SettingsSubSection'
import ActiveSubscriptions from './ActiveSubscriptions'
import PlanDetails from './PlanDetails'

class SubscriptionDetails extends React.Component {
  state = {
    showPlans: false
  }

  toggleShowPlans = () => {
    this.setState({ showPlans: !this.state.showPlans })
  }

  render () {
    const { subscription, canceledSubscriptions } = this.props

    if (this.state.showPlans) {
      return (
        <SettingsSubSection label="Choose a plan">
          <EditSubscription toggle={this.toggleShowPlans} />
        </SettingsSubSection>
      )
    }

    return (
      <div>
        <SettingsSubSection label="Your subscriptions">
          <ActiveSubscriptions
            toggleShowPlans={this.toggleShowPlans}
            subscription={subscription}
          />

          {
            canceledSubscriptions.length ? (
              <CanceledSubscriptions canceledSubscriptions={canceledSubscriptions} />
            ) : null
          }
        </SettingsSubSection>

        {
          subscription &&
          <SettingsSubSection label="Plan details" subText={subscription.plan.name}>
            <PlanDetails subscription={subscription} />
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
  subscription: null,
  canceledSubscriptions: null
}

SubscriptionDetails.propTypes = {
  subscription: PropTypes.object,
  canceledSubscriptions: PropTypes.array
}

const mapStateToProps = ({ auth }) => ({
  subscription: auth.authState.user.subscription,
  canceledSubscriptions: auth.authState.user.canceledSubscriptions
})

export default connect(
  mapStateToProps
)(SubscriptionDetails)
