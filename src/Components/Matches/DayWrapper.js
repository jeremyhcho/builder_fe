import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import { connect } from 'react-redux'

// Component
import Match from './Match'

// CSS
import './Matches.scss'

const DayWrapper = ({ matches, currentDate, date }) => {
  console.log('day: ', matches[0].date.format('YYYY-MM-DD'))
  console.log(currentDate)
  const day = date.split(' ').slice(0, 1)
  const month = date.split(' ').slice(1)
  return (
    <Row styleName="day-wrapper">
      <Col xs={2} styleName="day-card">
        <div>
          <h1 className="bold" style={{ textAlign: 'center' }}>{day}</h1>
          <h2 className="semibold">{month}</h2>
          <p className="semibold" style={{ position: 'absolute', bottom: '40px' }}>{matches.length} Games</p>
        </div>
      </Col>
      <Col xs={10}>
        {
          matches.map(match => {
            return (
              <Row key={match.id}>
                <Col xs={12} key={match.id}>
                  <Match key={match.id} match={match} />
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
  currentDate: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

const mapStateToProps = ({ dates }) => ({
  currentDate: dates.now
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayWrapper)
