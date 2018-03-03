import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import 'moment-timezone'

// Icons
import AtSign from 'Assets/Icons/at-sign.svg'
import ArrowUp from 'Assets/Icons/dg-arrow-up.svg'
import ArrowDown from 'Assets/Icons/dr-arrow-down.svg'
import HeartAdd from 'Assets/Icons/heart-add.svg'
import WindowAdd from 'Assets/Icons/window-add.svg'

// CSS
import './GameDetails.scss'

const GameDetails = ({ game, isTrial }) => {
  const renderLabel = () => {
    if (isTrial && game.trial) return 'free game'
    return 'standard'
  }

  const labelStyle = classNames('label', {
    free: isTrial && game.trial
  })

  const renderGameStatus = () => {
    const time = game.date.tz('America/New_York')

    switch (game.status) {
      case 'SCHEDULED':
        if (time.minutes() === 0) return time.format('hA')

        return time.format('h:mmA')

      case 'INPROGRESS':
        return 'IN PROGRESS'

      case 'CLOSED':
        return 'FINAL'

      default:
        return game.status
    }
  }

  const renderSpreadStats = (team) => ({
    moneyLine: game[team].odds.moneyline,
    spread: game[team].odds.spread,
    spreadOdds: game[team].odds.spread_odds,
    total: game[team].odds.total
  })

  return (
    <div styleName="game-details">
      <div styleName="label-row">
        <div styleName="left">
          <p styleName={labelStyle} className="small label">
            {renderLabel()}
          </p>
        </div>

        <div styleName="right">
          <span><HeartAdd height={18} width={18} /></span>
          <span><WindowAdd height={18} width={18} /></span>
        </div>
      </div>

      <div styleName="match-row">
        <div styleName="left">
          <div styleName="team">
            <p className="semibold small label">{game.away.city}</p>
            <h4 className="semibold">{game.away.name}</h4>
          </div>

          <div styleName="logo">
            <img src={game.away.image} />
          </div>


          <div styleName="points">
            <h4 className="semibold">{game.away.points}</h4>
          </div>
        </div>

        <div styleName="center">
          <AtSign width={16} height={16} />
          <p className="semibold">
            {renderGameStatus()}
          </p>
        </div>

        <div styleName="right">
          <div styleName="points">
            <h4 className="semibold">{game.home.points}</h4>
          </div>

          <div styleName="logo">
            <img src={game.home.image} />
          </div>

          <div styleName="team">
            <p className="semibold small label">{game.home.city}</p>
            <h4 className="semibold">{game.home.name}</h4>
          </div>
        </div>
      </div>

      <div styleName="spread-row">
        <div styleName="labels">
          <p className="label" styleName="money-line">moneyline</p>
          <p className="label" styleName="spread">spread</p>
          <p className="label" styleName="total">total</p>
        </div>

        <div styleName="values">
          {
            ['away', 'home'].map(team => {
              const spreadStats = renderSpreadStats(team)

              return (
                <div key={team} styleName="value-row">
                  <div styleName="value money-line">
                    <img src={game[team].image} />
                    <p>{spreadStats.moneyLine}</p>
                  </div>

                  <div styleName="value spread">
                    <img src={game[team].image} />
                    <p>{spreadStats.spread} {`(${spreadStats.spreadOdds})`}</p>
                  </div>

                  <div styleName="value total">
                    {team === 'away' ? <ArrowUp height={14} width={14} />
                      : <ArrowDown height={14} width={14} />}
                    <p>{spreadStats.total}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

GameDetails.propTypes = {
  game: PropTypes.object.isRequired,
  isTrial: PropTypes.bool.isRequired
}

export default GameDetails
