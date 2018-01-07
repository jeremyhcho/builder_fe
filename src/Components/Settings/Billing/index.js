import React from 'react'
// import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// Components
import MembershipPlan from './MembershipPlan'
import BillingInformation from './BillingInformation'

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
        <Row center='xs' style={{ margin: '0 auto 45px', maxWidth: '945px' }} between='xs'>
          <MembershipPlan plan="standard" userPlan={userPlan} />
          <MembershipPlan plan="advanced" userPlan={userPlan} />
        </Row>

        <BillingInformation />
      </div>
    )
  }
}

export default Billing
