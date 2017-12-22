import React from 'react'
import PropTypes from 'prop-types'
import 'moment-timezone'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components

// CSS
import './MatchCard.scss'

class MatchCard extends React.Component {
  viewMatch = () => {
    const { history, game } = this.props
    history.push(`${history.location.pathname}/${game.id}`)
  }

  render () {
    const { game } = this.props
    const time = game.date.tz('America/New_York').format('ha z')
    const awayTeam = game.away.name.toUpperCase()
    const awayCity = game.away.city

    const homeTeam = game.home.name.toUpperCase()
    const homeCity = game.home.city
    return (
      <Row styleName="match-container" middle='xs' onClick={this.viewMatch}>
        <Col xs={3} style={{ textAlign: 'right' }}>
          <p className="small label">{awayCity}</p>
          <h1 className="bold">{awayTeam}</h1>
          <p className='small'>{game.away.wins}-{game.away.losses}</p>
        </Col>
        <Col xs={1} style={{ textAlign: 'center' }}>
          <p className="bold">{game.away.points}</p>
        </Col>
        <Col xs={1} styleName="col-direction">
          <h1 className="semibold">@</h1>
          <p className="small">
            {game.status === 'SCHEDULED' ? time : 'FINAL'}
          </p>
        </Col>
        <Col xs={1} style={{ textAlign: 'center' }}>
          <p className="bold">{game.home.points}</p>
        </Col>
        <Col xs={3}>
          <p className="small label">{homeCity}</p>
          <h1 className="bold">{homeTeam}</h1>
          <p className='small'>{game.home.wins}-{game.home.losses}</p>
        </Col>
        <Col xs={3}>
          <p className="small label">Spread</p>
          <p className="semibold">+9.5 Lakers(-110)</p>
          <p className="semibold">-8.0 Lakers(-95)</p>
        </Col>
      </Row>
    )
  }
}

MatchCard.propTypes = {
  game: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(MatchCard)
