import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Component
import MatchCard from './MatchCard'

// CSS
import './Matches.scss'

const DayWrapper = ({ matches, date }) => {
  const day = date.split(' ').slice(0, 1)
  const month = date.split(' ').slice(1)
  return (
    <Row styleName="day-wrapper">
      <Col xs={2} styleName="day-card">
        <div>
          <h1 className="bold" style={{ textAlign: 'center' }}>{day}</h1>
          <h2 className="semibold">{month}</h2>
          <p className="semibold label" style={{ position: 'absolute', bottom: '40px' }}>{matches.length} Games</p>
        </div>
      </Col>
      <Col xs={10}>
        {
          matches.map(match => {
            return (
              <Row key={match.id}>
                <Col xs={12} key={match.id}>
                  <MatchCard key={match.id} game={match} />
                </Col>
              </Row>
            )
          })
        }
      </Col>
    </Row>
  )
}

DayWrapper.defaultProps = {
  matches: []
}

DayWrapper.propTypes = {
  matches: PropTypes.array,
  date: PropTypes.string.isRequired
}

export default DayWrapper
