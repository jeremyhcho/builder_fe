import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Components
import EditSubscription from './EditSubscription'
import SettingsSubSection from '../Blocks/SettingsSubSection'
import UserSubscriptions from './UserSubscriptions'

// Selectors
import { makeFilterSubscriptions } from 'Helpers/Selectors'

class SubscriptionDetails extends React.Component {
  state = {
    showPlans: false
  }

  componentWillMount () {
    const { history } = this.props

    if (history.location.state && history.location.state.from === '/') {
      this.setState({ showPlans: true })
    }
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
          <UserSubscriptions
            toggleShowPlans={this.toggleShowPlans}
            subscription={subscription}
            canceledSubscriptions={canceledSubscriptions}
          />
        </SettingsSubSection>

        <SettingsSubSection label="Payment history">
          <p className="label">Under construction</p>
        </SettingsSubSection>
      </div>
    )
  }
}

SubscriptionDetails.defaultProps = {
  subscription: null,
  canceledSubscriptions: [],
  history: null
}

SubscriptionDetails.propTypes = {
  subscription: PropTypes.object,
  canceledSubscriptions: PropTypes.array,
  history: PropTypes.object
}

const makeMapStateToProps = () => {
  const getSubscriptions = makeFilterSubscriptions()

  const mapStateToProps = ({ routines }) => ({
    subscription: getSubscriptions(routines).subscription,
    canceledSubscriptions: getSubscriptions(routines).canceledSubscriptions
  })

  return mapStateToProps
}

export default withRouter(connect(
  makeMapStateToProps
)(SubscriptionDetails))
