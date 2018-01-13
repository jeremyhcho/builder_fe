import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import pathToRegexp from 'path-to-regexp'
import { Route, Switch, Redirect } from 'react-router-dom'

// Components
import SettingsNav from './SettingsNav'
import AccountSettings from './AccountSettings'
import SubscriptionSettings from './SubscriptionSettings'

// CSS
import './Settings.scss'

// Actions
import { fetchBillingInformation, fetchSubscriptionPlan } from 'Actions'

const SETTING_SECTIONS = {
  '/settings': { header: '', subText: '' },
  '/settings/account': { header: 'Account Settings', subText: 'Manage and personalize your account settings' },
  '/settings/account/:subSection': { header: 'Account Settings', subText: 'Manage and personalize your account settings' },
  '/settings/subscription': { header: 'Subscription Settings', subText: '' },
}

class Settings extends React.Component {
  componentDidMount () {
    this.props.fetchBillingInformation(this.props.user.id)
    this.props.fetchSubscriptionPlan(this.props.user.id)
  }

  getCurrentRoute () {
    for (const regexp of Object.keys(SETTING_SECTIONS)) {
      if (pathToRegexp(regexp).exec(this.props.location.pathname)) {
        return SETTING_SECTIONS[regexp]
      }
    }

    return null
  }

  render () {
    const { fetchingBilling, ...routerProps } = this.props

    return (
      <div styleName="settings">
        <SettingsNav {...routerProps} />

        <div styleName="settings-content">
          <div styleName="settings-header">
            <p className="semibold">{this.getCurrentRoute().header}</p>
            <p className="label small">{this.getCurrentRoute().subText}</p>
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
  fetchSubscriptionPlan: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  user: auth.authState.user,
  fetchingBilling: auth.authState.fetchingBilling
})

const mapDispatchToProps = {
  fetchBillingInformation,
  fetchSubscriptionPlan
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
