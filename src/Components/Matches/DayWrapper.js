import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import { connect } from 'react-redux'

// Component
import Match from './Match'

// const utcDate = new Date(match.date).toISOString()
// // const date = moment(utcDate).format('dddd, MMMM Do YYYY')

const DayWrapper = ({ matches, currentDate, date }) => {
  console.log(currentDate)
  return (
    <Row style={{ marginBottom: '40px' }}>
      <h3 className="semibold" style={{ margin: '0 auto' }}>{date}</h3>
      {
        matches.map(match => {
          return (
            <Col xs={12} key={match.id}>
              <div>
                <Match key={match.id} match={match} />
              </div>
            </Col>
          )
        })
      }
    </Row>
  )
}

DayWrapper.defaultProps = {
  matches: []
}

DayWrapper.propTypes = {
  matches: PropTypes.array,
  currentDate: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired
}

const mapStateToProps = ({ dates }) => ({
  currentDate: dates
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayWrapper)
