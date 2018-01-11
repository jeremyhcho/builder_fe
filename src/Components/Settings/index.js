import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import { Route, Switch, Redirect } from 'react-router-dom'

// Components
import SettingsNav from './SettingsNav'
import AccountSettings from './AccountSettings'
import SubscriptionSettings from './SubscriptionSettings'

// CSS
import './Settings.scss'

// Actions
import { fetchBillingInformation } from 'Actions'

class Settings extends React.Component {
  componentDidMount () {
    this.props.fetchBillingInformation(this.props.user.id)
  }

  render () {
    const { fetchingBilling, ...routerProps } = this.props

    const headers = {
      '/settings': { header: '', subText: '' },
      '/settings/account': { header: 'Account Settings', subText: 'Manage and personalize your account settings' },
      '/settings/subscription': { header: 'Subscription Settings', subText: 'Choose a subscription plan' }
    }

    return (
      <div styleName="settings">
        <SettingsNav {...routerProps} />

        <div styleName="settings-content">
          <div styleName="settings-header">
            <p className="semibold">{headers[this.props.location.pathname].header}</p>
            <p className="label small">{headers[this.props.location.pathname].subText}</p>
          </div>

          {
            fetchingBilling ? (
              <div />
            ) : (
              <Elements>
                <Switch>
                  <Route path="/settings/account" component={AccountSettings} />
                  <Route path="/settings/subscription" component={SubscriptionSettings} />
                  <Redirect to="/settings/account" />
                </Switch>
              </Elements>
            )
          }
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  location: PropTypes.object.isRequired,
  fetchBillingInformation: PropTypes.func.isRequired,
  fetchingBilling: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  user: auth.authState.user,
  fetchingBilling: auth.authState.fetchingBilling
})

const mapDispatchToProps = {
  fetchBillingInformation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
