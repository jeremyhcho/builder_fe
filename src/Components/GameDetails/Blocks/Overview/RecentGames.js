import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { uniqueId } from 'lodash'

// Components
import { Card, ButtonGroup } from 'Components/Common'
import OverviewSpinner from 'Components/GameDetails/Blocks/OverviewSpinner'

// CSS
import './Overview.scss'

// Actions
import { fetchNBARecentGames } from 'Actions'

class RecentGames extends React.Component {
  state = {
    selected: 'away'
  }

  componentDidMount() {
    const { fetchNBARecentGames, matchId } = this.props
    fetchNBARecentGames(matchId)
  }

  parseStreak () {
    const { recentGames } = this.props
    const { selected } = this.state
    let counter = 1
    const streakType = recentGames[selected][0].outcome
    for (let i = 1; i < recentGames[selected].length; i++) {
      if (recentGames[selected][i].outcome === streakType) {
        counter += 1
      } else {
        break
      }
    }
    return streakType === 'win' ? (
      <span style={{ color: 'var(--green)', marginLeft: '5px' }} className="semibold">
        W{counter}
      </span>
    ) : (
      <span style={{ color: 'var(--red)', marginLeft: '5px' }} className="semibold">
        L{counter}
      </span>
    )
  }

  render () {
    const { recentGames, summary } = this.props
    const { selected } = this.state
    if (recentGames && summary) {
      const buttons = [
        { label: summary.away.name, key: 'away' },
        { label: summary.home.name, key: 'home' },
      ]
      return (
        <div>
          <Card
            label="Recent Games"
            wrapperStyle={{ padding: '25px' }}
            styleName="recent-games"
          >
            <Row middle='xs' center='xs' styleName="recent-games-header">
              <Col xs={6}>
                <h4 className='semibold'>
                  Streak {this.parseStreak()}
                </h4>
              </Col>

              <Col xs={6}>
                <ButtonGroup
                  buttons={buttons}
                  onChange={(e, button) => this.setState({ selected: button.key })}
                  defaultKey={buttons[0].key}
                />
              </Col>
            </Row>

            <div styleName='recent-games-wrapper'>
              {
                recentGames[selected].map((stats, index) => {
                  const teamType = stats.match_type
                  let opposingTeamType = 'away'
                  if (teamType === 'away') opposingTeamType = 'home'
                  return (
                    <div
                      key={uniqueId('recent_games_match_')}
                      style={{
                        display: 'flex',
                        width: '100%',
                        flex: 1,
                        flexDirection: 'column'
                      }}
                    >
                      <div
                        styleName="recent-games-match"
                      >
                        <div styleName="match-item">
                          {stats.outcome === 'loss' ? (
                            <div className='small semibold' styleName="outcome loss">
                              L
                            </div>
                          ) : (
                            <div className='small semibold' styleName="outcome win">
                              W
                            </div>
                          )}
                        </div>
                        <div styleName="match-item">
                          {
                            teamType === 'home' ? (
                              <p className="semibold">vs</p>
                            ) : (
                              <p className="semibold">@</p>
                            )
                          }
                        </div>
                        <div styleName="match-item">
                          <p>
                            <span>{stats.opposing_team} &nbsp;</span>
                            <span className='semibold small'>
                              ({stats.score[teamType]}-{stats.score[opposingTeamType]})
                            </span>
                          </p>
                        </div>
                      </div>

                      {
                        index !== recentGames[selected].length - 1 && (
                          <hr
                            style={{
                              border: 'none',
                              width: '100%',
                              height: '1px',
                              backgroundColor: 'var(--light-gray)',
                              margin: '10px 0 10px',
                              display: 'flex'
                            }}
                          />
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          </Card>
        </div>
      )
    }
    return (
      <div>
        <OverviewSpinner style={{ height: '386px' }} label="Recent Games" />
      </div>
    )
  }
}

RecentGames.defaultProps = {
  recentGames: {},
  summary: {}
}

RecentGames.propTypes = {
  matchId: PropTypes.string.isRequired,
  fetchNBARecentGames: PropTypes.func.isRequired,
  recentGames: PropTypes.object,
  summary: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary,
  recentGames: nba.gameDetails.overview.recentGames
})

const mapDispatchToProps = {
  fetchNBARecentGames
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentGames)
