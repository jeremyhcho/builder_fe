import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBACompletedTeamStats } from 'Actions'

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
    const { summary, fetchNBACompletedTeamStats } = this.props
    fetchNBACompletedTeamStats(summary.away.team_id, summary.home.team_id)
  }

  highlightStat (stat) {
    this.setState({ highlightedStat: stat })
  }

  render () {
    const { teamStats, summary } = this.props

    if (!teamStats.length) {
      return (
        <Card label="Team Stats" wrapperStyle={{ padding: '35px', textAlign: 'center' }}>
          <Spinner lg show />
        </Card>
      )
    }

    const awayStatsStyle = classNames('stats-value', {
      hovered: this.state.highlightedRow === 'away'
    })

    const homeStatsStyle = classNames('stats-value', {
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
              styleName={awayStatsStyle}
              className="semibold"
              onMouseOver={() => this.setState({ highlightedRow: 'away' })}
              onMouseOut={() => this.setState({ highlightedRow: null })}
            >
              {summary.away.name}
            </p>
            <p
              styleName={homeStatsStyle}
              className="semibold"
              onMouseOver={() => this.setState({ highlightedRow: 'home' })}
              onMouseOut={() => this.setState({ highlightedRow: null })}
            >
              {summary.home.name}
            </p>
          </div>

          <div styleName="stats-list-container stats">
            {
              Object.keys(teamStats[0]).map(stat => {
                if (!nbaFlatStat(stat)) return null

                const awayRoundedStat = tenths(teamStats[0][stat])
                const homeRoundedStat = tenths(teamStats[1][stat])

                return (
                  <div styleName="key-column stats" key={stat}>
                    <p
                      styleName="stats-label"
                      className="label semibold small"
                    >
                      {nbaFlatStat(stat)}
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
  fetchNBACompletedTeamStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  teamStats: routines.nba.completedTeamStats
})

const mapDispatchToProps = {
  fetchNBACompletedTeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
