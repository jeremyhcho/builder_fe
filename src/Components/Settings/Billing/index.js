import React from 'react'
// import PropTypes from 'prop-types'
import { Elements } from 'react-stripe-elements'
import { Row } from 'react-styled-flexboxgrid'

// Components
import MembershipPlan from './MembershipPlan'
import BillingInfo from './BillingInfo'
// import BillingInformation from './BillingInformation'

// CSS
import './Billing.scss'

class Billing extends React.Component {
  state = {
    userPlan: 'standard'
  }

  render () {
    const { userPlan } = this.state

    return (
      <div styleName="billing">
        <Row center='xs' style={{ margin: '0 auto 45px', maxWidth: '945px' }}>
          <MembershipPlan plan="standard" userPlan={userPlan} />
          <MembershipPlan plan="advanced" userPlan={userPlan} />
        </Row>

        <Elements>
          <BillingInfo />
        </Elements>
      </div>
    )
  }
}

export default Billing
