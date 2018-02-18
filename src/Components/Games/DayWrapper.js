import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import classNames from 'classnames'

// Component
import GameCard from './GameCard'

// CSS
import './Games.scss'

const DayWrapper = ({ games, date }) => {
  const day = date.split(' ')[0]
  const dayofWeek = date.split(' ')[1].toUpperCase()
  const month = date.split(' ')[2].slice(0, 3).toUpperCase()

  const gamesLengthLabel = classNames('gamesLength', {
    oneGame: games.length === 1
  })
  const cardInfoStyle = classNames('card-info', {
    oneGame: games.length === 1
  })

  return (
    <Row styleName="day-wrapper" style={{ position: 'relative' }}>
      <Col xs={2} styleName="day-card">
        <div styleName={cardInfoStyle}>
          <h4 className='semibold' style={{ textAlign: 'center' }}>{dayofWeek}</h4>
          <h1 className="bold" style={{ textAlign: 'center' }}>{month} {day}</h1>
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
          games.length ? (
            games.map(game => {
              return (
                <Row key={game.id}>
                  <Col xs={12}>
                    <GameCard game={game} />
                  </Col>
                </Row>
              )
            })
          ) : (
            <Row styleName="noGames-card" center='xs' middle='xs'>
              <Col xs={12}>
                <h1 className="semibold label">No Scheduled Games</h1>
              </Col>
            </Row>
          )
        }
      </Col>
    </Row>
  )
}

DayWrapper.defaultProps = {
  games: []
}

DayWrapper.propTypes = {
  games: PropTypes.array,
  date: PropTypes.string.isRequired
}

export default DayWrapper
