import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Button } from 'Components/Common'

// Icons
import CardEditIcon from 'Assets/Icons/settings/card_edit_white.svg'

// CSS
import './AccountSettings.scss'

const PaymentDetails = ({ card, toggleUpdate, subscription }) => {
  const convertToMonth = (month) => {
    if (month.toString().length === 1) {
      return `0${month}`
    }

    return month
  }

  const renderPaymentDate = () => {
    if (subscription) {
      return moment.unix(subscription.current_period_end).format('MMM DD, YYYY')
    }

    return 'Not subscribed'
  }

  return (
    <div>
      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p>Name on card:</p>
        </div>

        <div>
          <p>{card.name}</p>
        </div>
      </Row>

      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p>Card number:</p>
        </div>

        <div>
          <p>{card.brand} ending in {card.last4}</p>
        </div>
      </Row>

      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p>Expires:</p>
        </div>

        <div>
          <p>{convertToMonth(card.exp_month)}/{card.exp_year.toString().substr(2)}</p>
        </div>
      </Row>

      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p>Next payment date:</p>
        </div>

        <div styleName="col">
          <p>{renderPaymentDate()}</p>
        </div>

        <div style={{ marginLeft: 'auto', paddingRight: '25px' }}>
          <Button onClick={toggleUpdate}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
              <CardEditIcon style={{ marginRight: '5px', height: '18px' }} />
              <p>Change</p>
            </div>
          </Button>
        </div>
      </Row>
    </div>
  )
}

PaymentDetails.defaultProps = {
  subscription: null
}

PaymentDetails.propTypes = {
  card: PropTypes.object.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  subscription: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({
  subscription: auth.authState.user.subscription
})

export default connect(
  mapStateToProps
)(PaymentDetails)
