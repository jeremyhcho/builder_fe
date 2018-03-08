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
// import HeartAdd from 'Assets/Icons/heart-add.svg'
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

      case 'POSTPONED':
        return 'POSTPONED'

      default:
        return 'FINAL'
    }
  }

  renderGameStatus () {
    const time = this.props.game.date.tz('America/New_York')

    if (time.format('h:mm').split(':')[1] === '30') {
      return time.format('h:mm A')
    }

    return time.format('h A')
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
        total: '-',
        totalOdds: '-'
      }
    }

    return ({
      moneyline: game[team].odds.moneyline || '-',
      spread: game[team].odds.spread || '-',
      spreadOdds: game[team].odds.spread_odds || '-',
      total: game[team].odds.total || '-',
      totalOdds: game[team].odds.total_odds || '-'
    })
  }

  render () {
    const { game, isTrial, openBets, showBets } = this.props

    const gameDetailsStyle = classNames('game-details', {
      hide: showBets
    })

    const labelStyle = classNames('label', {
      scheduled: game.status === 'SCHEDULED',
      inprogress: game.status === 'INPROGRESS' || game.status === 'POSTPONED',
      closed: game.status === 'CLOSED'
    })

    return (
      <div styleName={gameDetailsStyle}>
        <div styleName="label-row">
          <div styleName="left">
            {
              isTrial && game.trial &&
              <span className="small">free</span>
            }

            <p styleName={labelStyle} className="small">
              {this.renderLabel()}
            </p>
          </div>

          <div styleName="right">
            {/* <span>
              <HeartAdd height={18} width={18} data-tip-for={`${game.id}-heart-add`} />
              <Tooltip id={`${game.id}-heart-add`} pos="top">
                Add a snackbar
              </Tooltip>
            </span> */}

            {
              game.away.odds && game.home.odds ? (
                <span onClick={openBets} style={{ cursor: 'pointer' }}>
                  <WindowAdd height={18} width={18} data-tip-for={`${game.id}-bets`} />
                  <Tooltip id={`${game.id}-bets`} pos="top">
                    Add Bet
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
          <span className="small label" styleName="date">{this.renderGameDate()}</span>

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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={game[team].image} />
                    </div>

                    <div>
                      <h4 className='semibold' styleName={teamNameStyle} style={{ fontSize: '16px' }}>
                        {game[team].city} {game[team].name}
                      </h4>

                      <p className='small' styleName={teamNameStyle}>
                        {`(${game[team].wins}-${game[team].losses})`}
                      </p>
                    </div>
                  </div>

                  <div styleName="right">
                    <h2 className="semibold">{game[team].points}</h2>
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
                      <p className="small">{spreadStats.total} {`(${spreadStats.totalOdds})`}</p>
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
  openBets: PropTypes.func.isRequired,
  showBets: PropTypes.bool.isRequired
}

export default GameStats
