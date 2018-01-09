import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


// Components
import SubmitCardInformation from './Card/SubmitCardInformation'
import CardInformation from './Card/CardInformation'

// CSS
import './Billing.scss'

/* eslint-disable max-len */
/* To change input wrapper styling for react-stripe-elements change .StripeElement in 'Assets/Stylesheets/Main.scss' */
/* eslint-enable max-len */

class BillingInfo extends React.Component {
  state = {
    updatingCard: false
  }

  toggleUpdateCard = () => {
    this.setState({ updatingCard: !this.state.updatingCard })
  }

  render () {
    const { user } = this.props

    if (Object.keys(user.billing).length && !this.state.updatingCard) {
      return (
        <CardInformation
          userId={user.id}
          card={user.billing.sources.data[0]}
          toggleUpdate={this.toggleUpdateCard}
        />
      )
    }

    return (
      <SubmitCardInformation
        userId={user.id}
        updating={this.state.updatingCard}
        toggleUpdate={this.toggleUpdateCard}
      />
    )
  }
}

BillingInfo.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  user: auth.authState.user
})

export default connect(
  mapStateToProps
)(BillingInfo)
