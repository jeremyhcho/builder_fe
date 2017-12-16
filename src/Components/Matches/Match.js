import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './Matches.scss'
import placeHolderLogo from './lal.png'

const styleLogo = {
  width: '70px',
  height: '70px'
}

const Match = ({ match }) => {
  const utcDate = new Date(match.date).toISOString()
  // const date = moment(utcDate).format('dddd, MMMM Do YYYY')
  const time = moment(utcDate).tz('America/New_York').format('ha z')
  const awayTeam = match.away_team.name
  const awayCity = match.away_team.city

  const homeTeam = match.home_team.name
  const homeCity = match.home_team.city
  return (
    <Row styleName="match-container" middle="xs">
      <Col xs={3} xsOffset={2}>
        <Row middle="xs">
          <Col xs={6}>
            <div style={{ textAlign: 'right' }}>
              <p className="small">{awayCity}</p>
              <h1 className="semibold">{awayTeam.toUpperCase()}</h1>
              <p className="small">4-1</p>
            </div>
          </Col>

          <Col xs={4}>
            <img src={placeHolderLogo} style={styleLogo} />
          </Col>

          <Col xs={2}>
            <p className="semibold">{match.id}</p>
          </Col>
        </Row>
      </Col>

      <Col xs={2} styleName="col-direction">
        <h1 className="semibold">@</h1>
        <p>{time}</p>
      </Col>

      <Col xs={3}>
        <Row middle="xs" reverse>
          <Col xs={6}>
            <div>
              <p className="small">{homeCity}</p>
              <h1 className="semibold">{homeTeam.toUpperCase()}</h1>
              <p className="small">1-4</p>
            </div>
          </Col>

          <Col xs={4}>
            <img src={placeHolderLogo} style={styleLogo} />
          </Col>

          <Col xs={2}>
            <p className="semibold">{match.id}</p>
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
