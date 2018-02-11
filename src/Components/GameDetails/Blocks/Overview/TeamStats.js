import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBATeamStats } from 'Actions'

// Helpers
import { precisionRound, nbaFlatStat } from 'Helpers'

// CSS
import './Overview.scss'

const tenths = precisionRound(1)

class TeamStats extends React.Component {
  state = {
    highlightedStat: null
  }

  componentDidMount () {
    const { summary, fetchNBATeamStats } = this.props
    fetchNBATeamStats(summary.away.team_id, summary.home.team_id)
  }

  highlightStat (stat) {
    this.setState({ highlightedStat: stat })
  }

  render () {
    const { teamStats, summary } = this.props

    if (!teamStats.length) {
      return (
        <Card label="Team Stats" wrapperStyle={{ padding: '65px', textAlign: 'center' }}>
          <Spinner lg show />
        </Card>
      )
    }

    const awayTeamValue = classNames('stats-value first', {
      hovered: this.state.highlightedRow === 'away'
    })

    const homeTeamValue = classNames('stats-value first', {
      hovered: this.state.highlightedRow === 'home'
    })

    return (
      <Card label="Team Stats" wrapperStyle={{ padding: '35px' }}>
        <div styleName="stats-list-container">
          <div styleName="key-column teams">
            <p
              styleName="stats-label"
              className="label semibold small"
            >
              TEAM
            </p>
            <p
              styleName={awayTeamValue}
              className="semibold"
              onMouseOver={() => this.setState({ highlightedRow: 'away' })}
              onMouseOut={() => this.setState({ highlightedRow: null })}
            >
              {summary.away.name}
            </p>
            <p
              styleName={homeTeamValue}
              className="semibold"
              onMouseOver={() => this.setState({ highlightedRow: 'home' })}
              onMouseOut={() => this.setState({ highlightedRow: null })}
            >
              {summary.home.name}
            </p>
          </div>

          <div styleName="stats-list-container stats">
            {
              Object.keys(teamStats[0]).map((stat, index, list) => {
                if (!nbaFlatStat(stat).short) return null

                const awayStatsStyle = classNames('stats-value', {
                  hovered: this.state.highlightedRow === 'away',
                  last: index === list.length - 1
                })

                const homeStatsStyle = classNames('stats-value', {
                  hovered: this.state.highlightedRow === 'home',
                  last: index === list.length - 1
                })

                let awayRoundedStat = tenths(teamStats[0][stat])
                let homeRoundedStat = tenths(teamStats[1][stat])

                if (stat.includes('pct')) {
                  awayRoundedStat = `${awayRoundedStat}%`
                  homeRoundedStat = `${homeRoundedStat}%`
                }

                return (
                  <div styleName="key-column stats" key={stat}>
                    <p
                      styleName="stats-label"
                      className="label semibold small"
                    >
                      {nbaFlatStat(stat).short}
                    </p>

                    <p
                      styleName={awayStatsStyle}
                      onMouseOver={() => this.setState({ highlightedRow: 'away' })}
                      onMouseOut={() => this.setState({ highlightedRow: null })}
                    >
                      {awayRoundedStat === undefined ? '-' : awayRoundedStat}
                    </p>

                    <p
                      styleName={homeStatsStyle}
                      onMouseOver={() => this.setState({ highlightedRow: 'home' })}
                      onMouseOut={() => this.setState({ highlightedRow: null })}
                    >
                      {homeRoundedStat === undefined ? '-' : homeRoundedStat}
                    </p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Card>
    )
  }
}

TeamStats.defaultProps = {
  teamStats: [],
  summary: {}
}

TeamStats.propTypes = {
  teamStats: PropTypes.array,
  summary: PropTypes.object,
  fetchNBATeamStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  teamStats: routines.nba.teamStats
})

const mapDispatchToProps = {
  fetchNBATeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
