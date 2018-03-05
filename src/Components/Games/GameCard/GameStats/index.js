import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import 'moment-timezone'

// Components
import { Tooltip } from 'Components/Common'

// Icons
// import AtSign from 'Assets/Icons/at-sign.svg'
import ArrowUp from 'Assets/Icons/green-arrow-up.svg'
import ArrowDown from 'Assets/Icons/red-arrow-down.svg'
import HeartAdd from 'Assets/Icons/heart-add.svg'
import WindowAdd from 'Assets/Icons/window-add.svg'
import GrayWindowAdd from 'Assets/Icons/gray-window-add.svg'
import LeftTriangle from 'Assets/Icons/left-triangle.svg'

// CSS
import './GameStats.scss'

class GameStats extends React.Component {
  renderLabel () {
    switch (this.props.game.status) {
      case 'SCHEDULED':
        return 'UPCOMING'

      case 'INPROGRESS':
        return 'IN PROGRESS'

      case 'CLOSED':
        return 'FINAL'

      default:
        return 'FINAL'
    }
  }

  renderGameStatus () {
    const time = this.props.game.date.tz('America/New_York')
    return time.format('h:mm A')
  }

  renderGameDate () {
    return this.props.game.date.tz('America/New_York').format('ddd, M/D')
  }

  renderSpreadStats (team) {
    const { game } = this.props

    if (!game[team].odds) {
      return {
        moneyline: '-',
        spread: '-',
        spreadOdds: '-',
        total: '-'
      }
    }

    return ({
      moneyline: game[team].odds.moneyline,
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
      free: isTrial && game.trial,
      scheduled: game.status === 'SCHEDULED',
      inprogress: game.status === 'INPROGRESS',
      closed: game.status === 'CLOSED'
    })

    return (
      <div styleName={gameDetailsStyle}>
        <div styleName="label-row">
          <div styleName="left">
            <p styleName={labelStyle} className="small label">
              {this.renderLabel()}
            </p>

            <span className="small label" styleName="date">{this.renderGameDate()}</span>

            {
              isTrial && game.trial &&
              <span styleName="free">FREE</span>
            }
          </div>

          <div styleName="right">
            <span>
              <HeartAdd height={18} width={18} data-tip-for="heart-add" />
              <Tooltip id="heart-add" pos="left">
                Add a snackbar
              </Tooltip>
            </span>

            {
              game.away.odds && game.home.odds ? (
                <span onClick={toggleShowBets} style={{ cursor: 'pointer' }}>
                  <WindowAdd height={18} width={18} data-tip-for={`${game.id}-bets`} />
                  <Tooltip id={`${game.id}-bets`} pos="bottom">
                    Bet log
                  </Tooltip>
                </span>
              ) : (
                <span style={{ cursor: 'not-allowed' }}>
                  <GrayWindowAdd height={18} width={18} />
                </span>
              )
            }
          </div>
        </div>

        <div styleName="match-row">
          <div styleName="game-status" className="semibold">{this.renderGameStatus()}</div>

          {
            ['away', 'home'].map(team => {
              const loser = game.away.points > game.home.points ? 'home' : 'away'

              const teamNameStyle = classNames('team-name', {
                loser: team === loser && game.status === 'CLOSED'
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
                    {
                      team !== loser && game.status === 'CLOSED' &&
                      <LeftTriangle styleName="pointer-icon" />
                    }
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
                      <p className="small">{spreadStats.moneyline}</p>
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

GameStats.propTypes = {
  game: PropTypes.object.isRequired,
  isTrial: PropTypes.bool.isRequired,
  toggleShowBets: PropTypes.func.isRequired,
  showBets: PropTypes.bool.isRequired
}

export default GameStats
