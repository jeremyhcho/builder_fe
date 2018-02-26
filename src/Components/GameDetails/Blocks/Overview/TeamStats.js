import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { Card, Spinner, Tooltip } from 'Components/Common'

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

  convertStat (stat, value) {
    if (value === undefined || value === null) return '-'

    if (stat === 'field_goals_pct') {
      // field goals % edge case
      return `${tenths(value * 100)}%`
    }

    let roundedStat = tenths(value)
    if (stat.includes('pct')) roundedStat = `${roundedStat}%`

    return roundedStat
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
                const flatStat = nbaFlatStat(stat)
                if (!flatStat.short) return null

                const awayStatsStyle = classNames('stats-value', {
                  hovered: this.state.highlightedRow === 'away',
                  last: index === list.length - 1
                })

                const homeStatsStyle = classNames('stats-value', {
                  hovered: this.state.highlightedRow === 'home',
                  last: index === list.length - 1
                })

                return (
                  <div styleName="key-column stats" key={stat}>
                    <div>
                      <p
                        styleName="stats-label"
                        data-tip-for={flatStat.short}
                        className="label semibold small"
                      >
                        {flatStat.short}
                      </p>
                      <Tooltip id={flatStat.short} pos="top">
                        {flatStat.full}
                      </Tooltip>
                    </div>

                    <p
                      styleName={awayStatsStyle}
                      onMouseOver={() => this.setState({ highlightedRow: 'away' })}
                      onMouseOut={() => this.setState({ highlightedRow: null })}
                    >
                      {this.convertStat(stat, teamStats[0][stat])}
                    </p>

                    <p
                      styleName={homeStatsStyle}
                      onMouseOver={() => this.setState({ highlightedRow: 'home' })}
                      onMouseOut={() => this.setState({ highlightedRow: null })}
                    >
                      {this.convertStat(stat, teamStats[1][stat])}
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
