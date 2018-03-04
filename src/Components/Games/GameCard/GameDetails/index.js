import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import 'moment-timezone'

// Components
import { Tooltip } from 'Components/Common'

// Icons
// import AtSign from 'Assets/Icons/at-sign.svg'
import ArrowUp from 'Assets/Icons/dg-arrow-up.svg'
import ArrowDown from 'Assets/Icons/dr-arrow-down.svg'
import HeartAdd from 'Assets/Icons/heart-add.svg'
import WindowAdd from 'Assets/Icons/window-add.svg'

// CSS
import './GameDetails.scss'

class GameDetails extends React.Component {
  renderLabel () {
    if (this.props.isTrial && this.props.game.trial) return 'free game'
    return 'standard'
  }

  renderGameStatus () {
    const { game } = this.props
    const time = game.date.tz('America/New_York')

    switch (game.status) {
      case 'SCHEDULED':
        if (time.minutes() === 0) return time.format('hA')

        return `Scheduled ${time.format('h:mm A')}`

      case 'INPROGRESS':
        return 'In progress'

      case 'CLOSED':
        return 'Final'

      default:
        return game.status
    }
  }

  renderSpreadStats (team) {
    const { game } = this.props

    return ({
      moneyLine: game[team].odds.moneyline,
      spread: game[team].odds.spread,
      spreadOdds: game[team].odds.spread_odds,
      total: game[team].odds.total
    })
  }

  render () {
    const { game, isTrial, toggleShowBets, showBets } = this.props

    const gameDetailsStyle = classNames('game-details', {
      hide: showBets
    })

    const labelStyle = classNames('label', {
      free: isTrial && game.trial
    })

    return (
      <div styleName={gameDetailsStyle}>
        <div styleName="label-row">
          <div styleName="left">
            <p styleName={labelStyle} className="small label">
              {this.renderLabel()}
            </p>
          </div>

          <div styleName="right">
            <span>
              <HeartAdd height={18} width={18} data-tip-for="heart-add" />
              <Tooltip id="heart-add" pos="left">
                Add a snackbar
              </Tooltip>
            </span>

            <span onClick={toggleShowBets}>
              <WindowAdd height={18} width={18} data-tip-for="bets" />
              <Tooltip id="bets" pos="bottom">
                Bet log
              </Tooltip>
            </span>
          </div>
        </div>

        <div styleName="match-row">
          <h4 styleName="game-status" className="semibold">{this.renderGameStatus()}</h4>

          {
            ['away', 'home'].map(team => {
              const loser = game.away.points > game.home.points ? 'home' : 'away'

              const teamNameStyle = classNames('team-name', {
                loser: team === loser
              })

              return (
                <div styleName="team-row" key={team}>
                  <div styleName="left">
                    <img src={game[team].image} />

                    <h4 styleName={teamNameStyle}>{game[team].city} {game[team].name}</h4>

                    <p styleName={teamNameStyle}>
                      {`(${game[team].wins}-${game[team].losses})`}
                    </p>
                  </div>

                  <div styleName="right">
                    <h1 className="semibold">{game[team].points}</h1>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div styleName="spread-row">
          <div styleName="labels">
            <p className="label small" styleName="money-line">moneyline</p>
            <p className="label small" styleName="spread">spread</p>
            <p className="label small" styleName="total">total</p>
          </div>

          <div styleName="values">
            {
              ['away', 'home'].map(team => {
                const spreadStats = this.renderSpreadStats(team)

                return (
                  <div key={team} styleName="value-row">
                    <div styleName="value money-line">
                      <img src={game[team].image} />
                      <p className="small">{spreadStats.moneyLine}</p>
                    </div>

                    <div styleName="value spread">
                      <img src={game[team].image} />
                      <p className="small">{spreadStats.spread} {`(${spreadStats.spreadOdds})`}</p>
                    </div>

                    <div styleName="value total">
                      {team === 'away' ? <ArrowUp height={14} width={14} />
                        : <ArrowDown height={14} width={14} />}
                      <p className="small">{spreadStats.total}</p>
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
}

GameDetails.propTypes = {
  game: PropTypes.object.isRequired,
  isTrial: PropTypes.bool.isRequired,
  toggleShowBets: PropTypes.func.isRequired,
  showBets: PropTypes.bool.isRequired
}

export default GameDetails
