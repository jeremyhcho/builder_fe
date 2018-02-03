import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import EditSubscription from './EditSubscription'
import CanceledSubscriptions from './CanceledSubscriptions'
import SettingsSubSection from '../Blocks/SettingsSubSection'
import ActiveSubscriptions from './ActiveSubscriptions'
import PlanDetails from './PlanDetails'

// Selectors
import { makeFilterSubscriptions } from 'Helpers/Selectors'

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
  canceledSubscriptions: []
}

SubscriptionDetails.propTypes = {
  subscription: PropTypes.object,
  canceledSubscriptions: PropTypes.array
}

const makeMapStateToProps = () => {
  const getSubscriptions = makeFilterSubscriptions()

  const mapStateToProps = ({ routines }) => ({
    subscription: getSubscriptions(routines).subscription,
    canceledSubscriptions: getSubscriptions(routines).canceledSubscriptions
  })

  return mapStateToProps
}

export default connect(
  makeMapStateToProps
)(SubscriptionDetails)
