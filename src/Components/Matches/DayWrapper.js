import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Component
import MatchCard from './MatchCard'

// CSS
import './Matches.scss'

class DayWrapper extends React.Component {
  render () {
    const { games, date } = this.props
    const day = date.split(' ').slice(0, 1)
    const month = date.split(' ').slice(1)
    return (
      <Row styleName="day-wrapper">
        <Col xs={2} styleName="day-card">
          <div>
            <h1 className="bold" style={{ textAlign: 'center' }}>{day}</h1>
            <h2 className="semibold">{month}</h2>
            <p className="semibold label" style={{ position: 'absolute', bottom: '40px' }}>{games.length} Games</p>
          </div>
        </Col>
        <Col xs={10}>
          {
            games.map(game => {
              return (
                <Row key={game.id}>
                  <Col xs={12} key={game.id}>
                    <MatchCard key={game.id} game={game} />
                  </Col>
                </Row>
              )
            })
          }
        </Col>
      </Row>
    )
  }
}

DayWrapper.defaultProps = {
  games: []
}

DayWrapper.propTypes = {
  games: PropTypes.array,
  date: PropTypes.string.isRequired
}

export default DayWrapper
