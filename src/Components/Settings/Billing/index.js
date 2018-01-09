import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import { Row } from 'react-styled-flexboxgrid'

// Components
import MembershipPlan from './MembershipPlan'
import BillingInfo from './BillingInfo'
import SubHeader from '../SubHeader'
import { Spinner } from 'Components/Common'

// CSS
import './Billing.scss'

// Actions
import { fetchBillingInformation } from 'Actions'

class Billing extends React.Component {
  state = {
    userPlan: 'standard'
  }

  componentDidMount () {
    this.props.fetchBillingInformation(this.props.user.id)
  }

  renderBillingInfo () {
    if (this.props.user.billing) {
      return (
        <Row center='xs'>
          <Elements>
            <BillingInfo />
          </Elements>
        </Row>
      )
    }

    return null
  }

  render () {
    const { userPlan } = this.state
    const { fetchingBilling } = this.props
    const BillingSubText = 'Create a new payment method or change your existing payment method stored in your Quartz account'

    if (fetchingBilling) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '127.5px' }}>
          <Spinner lg show />
        </div>
      )
    }

    return (
      <div styleName="billing">
        <Row center='xs' style={{ margin: '0 auto', maxWidth: '945px' }}>
          <MembershipPlan plan="standard" userPlan={userPlan} />
          <MembershipPlan plan="advanced" userPlan={userPlan} />
        </Row>

        <SubHeader text="Billing Info" subText={BillingSubText} />
        {this.renderBillingInfo()}
      </div>
    )
  }
}

Billing.propTypes = {
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
)(Billing)
