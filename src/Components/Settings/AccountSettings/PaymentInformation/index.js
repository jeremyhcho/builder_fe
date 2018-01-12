import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Button } from 'Components/Common'

// Icons
import CardEditIcon from 'Assets/Icons/settings/card_edit_white.svg'

// CSS
import './PaymentInformation.scss'

const PaymentInformation = ({ card, toggleUpdate }) => {
  const convertToMonth = (month) => {
    if (month.toString().length === 1) {
      return `0${month}`
    }

    return month
  }

  return (
    <div styleName="card-information">
      <p className="semibold">{card.name}</p>
      <p className="semibold">{card.brand} ending in {card.last4}</p>
      <p className="semibold">Expires {convertToMonth(card.exp_month)}/{card.exp_year.toString().substr(2)}</p>
      <p className="small label">Next payment date: xxx</p>
      <Button
        onClick={toggleUpdate}
        style={{
          position: 'absolute',
          bottom: '0',
          right: '0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
          <CardEditIcon style={{ marginRight: '5px', height: '18px' }} />
          <p>Change</p>
        </div>
      </Button>
    </div>
  )
}

PaymentInformation.propTypes = {
  card: PropTypes.object.isRequired,
  toggleUpdate: PropTypes.func.isRequired
}

export default PaymentInformation
