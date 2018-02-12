import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Components
import { Card, Tooltip } from 'Components/Common'

// Icons
import CaratUpIcon from 'Assets/Icons/carat-up.svg'

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
    return index === 0 ? 'starter' : 'bench'
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

  convertStat (stat, value) {
    if (value === undefined || value === null) return '-'

    let roundedStat = tenths(value)
    if (stat.includes('pct')) roundedStat = `${roundedStat}%`

    return roundedStat
  }

  render () {
    const { players, teamName, teamType, sortStatsKey } = this.props

    const teamPlayers = [players.starter, players.bench]

    return (
      <Card label={teamName} wrapperStyle={{ padding: '40px' }} styleName="player-stats">
        {
          teamPlayers.map((playerType, index) => (
            <div className="flex" key={this.getPlayerType(index)}>
              <div styleName="players-container">
                <div style={{ width: '100%' }}>
                  <p className="semibold label" styleName="label players">
                    {
                      this.getPlayerType(index)[0].toUpperCase()
                      + this.getPlayerType(index).substr(1)
                    }
                  </p>
                  {
                    playerType.map((player, playerIndex) => {
                      const playersValueStyle = classNames('value players', {
                        hovered: this.state.highlightedRow === playerIndex + (index * 5),
                        first: playerIndex === 0
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
                  Object.keys(playerType[0].statistics).map(statKey => {
                    const flatStat = nbaFlatStat(statKey)
                    if (!flatStat.short) return null

                    const currentSortStatsKey = sortStatsKey[teamType][this.getPlayerType(index)]

                    const labelStatsStyle = classNames('label stats', {
                      selected: currentSortStatsKey.stat === statKey
                    })

                    const caratStyle = classNames('carat', {
                      descending: !currentSortStatsKey.ascending
                    })

                    return (
                      <div key={statKey} styleName='stat-column'>
                        <div className="flex" style={{ transition: 'none' }}>
                          {
                            currentSortStatsKey.stat === statKey ? (
                              <p
                                className="semibold label"
                                data-tip-for={`${flatStat.short}-${teamName}-${index}`}
                                styleName={labelStatsStyle}
                                onClick={
                                  () => this.sortStats(statKey, playerType[0].starter, teamType)
                                }
                              >
                                {flatStat.short}
                                {<CaratUpIcon styleName={caratStyle} width={10} height={10} />}
                              </p>
                            ) : (
                              <p
                                className="semibold label"
                                data-tip-for={`${flatStat.short}-${teamName}-${index}`}
                                styleName={labelStatsStyle}
                                onClick={
                                  () => this.sortStats(statKey, playerType[0].starter, teamType)
                                }
                              >
                                {flatStat.short}
                              </p>
                            )
                          }
                          <Tooltip id={`${flatStat.short}-${teamName}-${index}`} pos="top">{flatStat.full}</Tooltip>
                        </div>

                        {
                          playerType.map((player, statIndex) => {
                            const playersValueStyle = classNames('value stat', {
                              hovered: this.state.highlightedRow === statIndex + (index * 5),
                              last: statIndex === playerType.length - 1
                            })

                            return (
                              <div
                                key={player.id}
                                styleName={playersValueStyle}
                                onMouseOver={() => this.highlightRow(statIndex, index)}
                                onMouseOut={() => this.setState({ highlightedRow: null })}
                              >
                                <p>
                                  {
                                    player.statistics.minutes === '00:00' ?
                                      '- -' : this.convertStat(statKey, player.statistics[statKey])
                                  }
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
  sortStatsKey: PropTypes.object.isRequired,
  changeSortStatsKey: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  changeSortStatsKey
}

const mapStateToProps = ({ nba }) => ({
  sortStatsKey: nba.sortStatsKey
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPlayers)
