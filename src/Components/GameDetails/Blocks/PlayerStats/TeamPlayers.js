import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { Card } from 'Components/Common'

// CSS
import './PlayerStats.scss'

// Helpers
import { nbaFlatStat, precisionRound } from 'Helpers'

const tenths = precisionRound(1)

class TeamPlayers extends React.Component {
  state = {
    highlightedRow: null,
    highlightedStat: null
  }

  getPlayerType (index) {
    return index === 0 ? 'Starters' : 'Bench'
  }

  highlightStat = (stat) => {
    this.setState({ highlightedStat: stat })
  }

  highlightRow = (row, primaryIndex) => {
    this.setState({ highlightedRow: row + (primaryIndex * 5) })
  }

  render () {
    const { players, teamName } = this.props

    const starterPlayers = players.filter(player => player.starter)
    const benchPlayers = players.filter(player => !player.starter)

    const teamPlayers = [starterPlayers, benchPlayers]

    return (
      <Card label={teamName} wrapperStyle={{ padding: '40px' }} styleName="player-stats">
        {
          teamPlayers.map((playerType, index) => (
            <div className="flex" key={this.getPlayerType(index)}>
              <div styleName="players-container">
                <div style={{ width: '100%' }}>
                  <p className="semibold label" style={{ margin: '15px 0' }}>
                    {this.getPlayerType(index)}
                  </p>
                  {
                    playerType.map((player, playerIndex) => {
                      const playersValueStyle = classNames('players-value', {
                        hovered: this.state.highlightedRow === playerIndex + (index * 5)
                      })

                      return (
                        <div
                          key={player.id}
                          styleName={playersValueStyle}
                          onMouseEnter={() => this.highlightRow(playerIndex, index)}
                          onMouseLeave={() => this.setState({ highlightedRow: null })}
                        >
                          <p className="semibold">
                            {player.first_name.slice(0, 1)}. {player.last_name}
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div styleName="players-container stats">
                {
                  Object.keys(playerType[0].statistics).map(stat => {
                    if (!nbaFlatStat(stat)) return null
                    const statKeyStyle = classNames('statKey', {
                      hovered: this.state.highlightedStat === stat
                    })

                    return (
                      <div key={stat} styleName={statKeyStyle}>
                        <p
                          className="semibold label"
                          styleName="players-label"
                          onMouseEnter={() => this.highlightStat(stat)}
                          onMouseLeave={() => this.setState({ highlightedStat: null })}
                        >
                          {nbaFlatStat(stat)}
                        </p>
                        {
                          playerType.map((player, statIndex) => {
                            const playersValueStyle = classNames('players-value stat', {
                              hovered: this.state.highlightedRow === statIndex + (index * 5)
                            })

                            return (
                              <div key={player.id} styleName={playersValueStyle}>
                                <p>
                                  {tenths(player.statistics[stat])}
                                </p>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          ))
        }
      </Card>
    )
  }
}

TeamPlayers.propTypes = {
  teamName: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
}

export default TeamPlayers
