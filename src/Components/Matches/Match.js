import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './Matches.scss'
import placeHolderLogo from './lal.png'

const styleLogo = {
  width: '80px',
  height: '80px'
}

const Match = ({ match }) => {
  const utcDate = new Date(match.date).toISOString()
  const date = moment(utcDate).format('dddd, MMMM Do YYYY')
  const time = moment(utcDate).tz('America/New_York').format('ha z')
  return (
    <Row styleName="match-container">
      <Col xs={4}>
        <Row middle="xs">
          <Col xs={6}>
            <img src={placeHolderLogo} style={styleLogo} />
          </Col>

          <Col xs={4}>
            <p>{match.away_team.name}</p>
          </Col>

          <Col xs={2}>
            <p>{match.id}</p>
          </Col>
        </Row>
      </Col>

      <Col xs={4} styleName="col-direction">
        <p>{date}</p>
        <h2 style={{ fontStyle: 'italic' }}>@</h2>
        <p>{time}</p>
      </Col>

      <Col xs={4}>
        <Row middle="xs">
          <Col xs={2}>
            <p>{match.id}</p>
          </Col>

          <Col xs={4}>
            <p>{match.home_team.name}</p>
          </Col>

          <Col xs={6}>
            <img src={placeHolderLogo} style={styleLogo} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Match.propTypes = {
  match: PropTypes.object.isRequired
}

export default Match
