import React from 'react'

// Components
import Account from './Account'
import Billing from './Billing'
import SubHeader from './SubHeader'

// CSS
import './Settings.scss'

const AccountSubText = 'Manage and personalize account settings'
const BillingSubText = 'Choose a payment plan and fill out the payment option and information below'

class Settings extends React.Component {
  render () {
    return (
      <div
        style={{
          overflowX: 'hidden',
          maxWidth: '1600px',
          paddingBottom: '60px'
        }}
      >
        <SubHeader text="Account Info" subText={AccountSubText} />
        <Account />

        <SubHeader text="Billing Info" subText={BillingSubText} />
        <Billing />
      </div>
    )
  }
}

export default Settings
