import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import classNames from 'classnames'

// Component
import GameCard from './GameCard'

// CSS
import './Games.scss'

class DayWrapper extends React.Component {
  render () {
    const { games, date } = this.props
    const day = date.split(' ').slice(0, 1)
    const month = date.split(' ')[1].slice(0, 3).toUpperCase()
    const gamesLengthLabel = classNames('gamesLength', {
      oneGame: games.length === 1
    })
    const cardInfoStyle = classNames('card-info', {
      oneGame: games.length === 1
    })
    return (
      <Row styleName="day-wrapper" style={{ position: 'relative' }}>
        <p
          className='small'
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px'
          }}
        >
          All times displayed in EST
        </p>

        <Col xs={2} styleName="day-card">
          <div styleName={cardInfoStyle}>
            <h1 className="bold" style={{ textAlign: 'center' }}>{day}</h1>
            <h2 className="semibold" style={{ textAlign: 'center' }}>{month}</h2>
            <p
              className="semibold label"
              styleName={gamesLengthLabel}
            >
              {games.length} {games.length === 1 ? ('Game') : ('Games')}
            </p>
          </div>
        </Col>
        <Col xs={10}>
          {
            games.map(game => {
              return (
                <Row key={game.id}>
                  <Col xs={12} key={game.id}>
                    <GameCard key={game.id} game={game} />
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
