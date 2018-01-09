import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Button, Card } from 'Components/Common'

// Icons
import CreditCardIcon from 'Assets/Icons/settings/credit_card.svg'

// CSS
import './CardInformation.scss'

const CardInformation = ({ card, toggleUpdate }) => {
  const convertToMonth = (month) => {
    if (month.toString().length === 1) {
      return `0${month}`
    }

    return month
  }

  return (
    <Card
      style={{ margin: '0' }}
      styleName="card-info-container"
      label="Your current card information"
      wrapperStyle={{ padding: '5px 0 5px 45px' }}
    >
      <Row middle='xs'>
        <Col xs={1}>
          <CreditCardIcon style={{ height: '18px' }} />
        </Col>

        <Col xs={3}>
          <p className="semibold" styleName="card-name">
            {card.name}
          </p>
        </Col>

        <Col xs={3}>
          <p className="semibold" style={{ whiteSpace: 'nowrap' }}>
            {card.funding[0].toUpperCase() + card.funding.substr(1)} Card ending in {card.last4}
          </p>
        </Col>

        <Col xs={1} xsOffset={1} style={{ position: 'relative' }}>
          <p className="semibold" style={{ position: 'absolute', top: '-36px', left: '0' }}>
            Expires
          </p>
          <p className="semibold">
            {convertToMonth(card.exp_month)}/{card.exp_year.toString().substr(2)}
          </p>
        </Col>

        <Col xs={2} xsOffset={1} style={{ textAlign: 'right', paddingRight: '10px' }}>
          <Button onClick={toggleUpdate}><p className="semibold">Change</p></Button>
        </Col>
      </Row>
    </Card>
  )
}

CardInformation.propTypes = {
  card: PropTypes.object.isRequired,
  toggleUpdate: PropTypes.func.isRequired
}

export default CardInformation
