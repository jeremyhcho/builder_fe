import React from 'react'
import PropTypes from 'prop-types'
import 'moment-timezone'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { IconDropdown, MenuItem } from 'Components/Common'

// CSS
import './Matches.scss'

const Match = ({ match }) => {
  // const time = match.date.tz('America/New_York').format('ha z')
  const awayTeam = match.away_team.name.toUpperCase()
  const awayCity = match.away_team.city

  const homeTeam = match.home_team.name.toUpperCase()
  const homeCity = match.home_team.city
  return (
    <Row styleName="match-container" middle='xs'>
      <Col xs={2} style={{ textAlign: 'right' }}>
        <p className="small label">{awayCity}</p>
        <h1 className="bold">{awayTeam}</h1>
        <p>4-1</p>
      </Col>
      <Col xs={1} xsOffset={0.5} styleName="col-direction">
        <h1 className="semibold">@</h1>
        {/* <p className="small">{time}</p> */}
      </Col>
      <Col xs={2} xsOffset={0.5}>
        <p className="small label">{homeCity}</p>
        <h1 className="bold">{homeTeam}</h1>
        <p>1-3</p>
      </Col>
      <Col xs={3} xsOffset={2}>
        <p className="small label">Spread</p>
        <p className="semibold">+9.5 Lakers(-110)</p>
        <p className="semibold">-8.0 Lakers(-95)</p>
      </Col>
      <Col xs={1}>
        <IconDropdown
          horizontalReverse
          icon={<i className="fa fa-ellipsis-v" aria-hidden="true" />}
        >
          <MenuItem onClick={() => console.log('Clicked')}>
            <i className="fa fa-eye" aria-hidden="true" /> View
          </MenuItem>
          <MenuItem onClick={() => console.log('Clicked')}>
            <i className="fa fa-plus" aria-hidden="true" /> Add to list
          </MenuItem>
        </IconDropdown>
      </Col>
    </Row>
  )
}

Match.propTypes = {
  match: PropTypes.object.isRequired
}

export default Match
