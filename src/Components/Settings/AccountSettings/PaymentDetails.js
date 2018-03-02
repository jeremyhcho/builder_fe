import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Button } from 'Components/Common'

// Icons
import CardEditIcon from 'Assets/Icons/settings/fc-card-edit.svg'

// CSS
import './AccountSettings.scss'

// Helpers
import { makeFilterSubscriptions } from 'Helpers/Selectors'

const PaymentDetails = ({ card, subscription, toggleUpdate, canceledSubscriptions }) => {
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

    if (!subscription && canceledSubscriptions.length) {
      return moment.unix(canceledSubscriptions[0].current_period_end).format('MMM DD, YYYY')
    }

    return 'Not subscribed'
  }

  return (
    <div>
      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p className="label">Name on card:</p>
        </div>

        <div>
          <p>{card.name}</p>
        </div>
      </Row>

      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p className="label">Card number:</p>
        </div>

        <div>
          <p>{card.brand} ending in {card.last4}</p>
        </div>
      </Row>

      <Row middle='xs' styleName="row">
        <div styleName="col">
          <p className="label">Expires:</p>
        </div>

        <div>
          <p>{convertToMonth(card.exp_month)}/{card.exp_year.toString().substr(2)}</p>
        </div>
      </Row>

      <Row middle='xs' styleName="end-row">
        <div styleName="col">
          <p className="label">Next payment date:</p>
        </div>

        <div styleName="col">
          <p>{renderPaymentDate()}</p>
        </div>

        <div styleName="change-payment">
          <Button secondary onClick={toggleUpdate}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardEditIcon style={{ marginRight: '5px' }} height={14} />
              <p>Change</p>
            </div>
          </Button>
        </div>
      </Row>
    </div>
  )
}

PaymentDetails.defaultProps = {
  subscription: null,
  canceledSubscriptions: []
}

PaymentDetails.propTypes = {
  card: PropTypes.object.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  subscription: PropTypes.object,
  canceledSubscriptions: PropTypes.array
}

const makeMapStateToProps = () => {
  const getSubscription = makeFilterSubscriptions()
  return ({ routines }) => ({
    subscription: getSubscription(routines).subscription,
    canceledSubscriptions: getSubscription(routines).canceledSubscriptions
  })
}

export default connect(
  makeMapStateToProps
)(PaymentDetails)
