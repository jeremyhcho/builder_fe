import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Components
import { Card } from 'Components/Common'

// CSS
import './PlayerStats.scss'

// Helpers
import { nbaFlatStat, precisionRound } from 'Helpers'

// Actions
import { changeSortStatsKey } from 'Actions'

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

  sortStats = (stat, starter, teamType) => {
    let playerType
    if (starter) {
      playerType = 'starter'
    } else {
      playerType = 'bench'
    }
    this.props.changeSortStatsKey(stat, playerType, teamType)
  }

  render () {
    const { players, teamName, teamType } = this.props

    const teamPlayers = [players.starter, players.bench]

    return (
      <Card label={teamName} wrapperStyle={{ padding: '40px' }} styleName="player-stats">
        {
          teamPlayers.map((playerType, index) => (
            <div className="flex" key={this.getPlayerType(index)}>
              <div styleName="players-container">
                <div style={{ width: '100%' }}>
                  <p className="semibold label" styleName="label players">
                    {this.getPlayerType(index)}
                  </p>
                  {
                    playerType.map((player, playerIndex) => {
                      const playersValueStyle = classNames('value players', {
                        hovered: this.state.highlightedRow === playerIndex + (index * 5)
                      })

                      return (
                        <div
                          key={player.id}
                          styleName={playersValueStyle}
                          onMouseOver={() => this.highlightRow(playerIndex, index)}
                          onMouseOut={() => this.setState({ highlightedRow: null })}
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

                    return (
                      <div key={stat} styleName='stat-column'>
                        <p
                          className="semibold label"
                          styleName="label stats"
                          onClick={() => this.sortStats(stat, playerType[0].starter, teamType)}
                        >
                          {nbaFlatStat(stat)}
                        </p>
                        {
                          playerType.map((player, statIndex) => {
                            const playersValueStyle = classNames('value stat', {
                              hovered: this.state.highlightedRow === statIndex + (index * 5)
                            })

                            const roundedStat = tenths(player.statistics[stat])

                            return (
                              <div
                                key={player.id}
                                styleName={playersValueStyle}
                                onMouseOver={() => this.highlightRow(statIndex, index)}
                                onMouseOut={() => this.setState({ highlightedRow: null })}
                              >
                                <p>
                                  {roundedStat === undefined ? '-' : roundedStat}
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
  teamType: PropTypes.string.isRequired,
  players: PropTypes.object.isRequired,
  changeSortStatsKey: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  changeSortStatsKey
}

export default connect(
  null,
  mapDispatchToProps
)(TeamPlayers)
