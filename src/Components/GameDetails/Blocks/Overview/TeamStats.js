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

    return (
      <Card label="Team Stats" wrapperStyle={{ padding: '35px' }}>
        <div styleName="stats-list-container">
          <div styleName="stat-key teams">
            <p
              styleName="stats-label"
              className="label semibold small"
            >
              TEAM
            </p>
            <p
              styleName="stats-value"
              className="semibold"
            >
              {summary.away.name}
            </p>
            <p
              styleName="stats-value"
              className="semibold"
            >
              {summary.home.name}
            </p>
          </div>

          <div styleName="stats-list-container stats">
            {
              Object.keys(teamStats[0]).map(stat => {
                if (!nbaFlatStat(stat)) return null

                const statKeyStyle = classNames('stat-key', {
                  hovered: this.state.highlightedStat === stat
                })

                return (
                  <div styleName={statKeyStyle} key={stat}>
                    <p
                      styleName="stats-label"
                      className="label semibold small"
                      onMouseEnter={() => this.highlightStat(stat)}
                      onMouseLeave={() => this.setState({ highlightedStat: '' })}
                    >
                      {nbaFlatStat(stat)}
                    </p>

                    <p
                      styleName="stats-value"
                    >
                      {tenths(teamStats[0][stat])}
                    </p>

                    <p
                      styleName="stats-value"
                    >
                      {tenths(teamStats[1][stat])}
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
