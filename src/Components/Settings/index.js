import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import Account from './Account'
import Billing from './Billing'
import SubHeader from './SubHeader'

// CSS
import './Settings.scss'

const AccountSubText = 'Manage and personalize account settings'
const PaymentSubText = 'Choose a payment plan and fill out the payment option and information below'

class Settings extends React.Component {
  render () {
    if (!Object.keys(this.props.user).length) {
      return null
    }

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

        <SubHeader text="Payment Options" subText={PaymentSubText} />
        <Billing />
      </div>
    )
  }
}

Settings.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  user: auth.authState.user
})

export default connect(
  mapStateToProps
)(Settings)
