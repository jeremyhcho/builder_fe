import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import SubSection from '../Blocks/Subsection'
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
            <SubSection
              label="Account details"
            >
              <AccountDetails />
            </SubSection>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <SubSection
              label="Payment"
            >
              <PaymentSettings />
            </SubSection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AccountSettings
