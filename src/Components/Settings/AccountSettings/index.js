import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import SettingsSubSection from '../Blocks/SettingsSubSection'
import PaymentSettings from './PaymentSettings'
import AccountDetails from './AccountDetails'

// Icons
// import CreditIcon from 'Assets/Icons/settings/credit_locked.svg'

// CSS
import './AccountSettings.scss'

class AccountSettings extends React.Component {
  render () {
    return (
      <div styleName="account-settings">
        <Row>
          <Col xs={12}>
            <SettingsSubSection
              label="Account details"
            >
              <AccountDetails />
            </SettingsSubSection>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <SettingsSubSection
              label="Payment"
            >
              <PaymentSettings />
            </SettingsSubSection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AccountSettings
