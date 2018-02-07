import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBATeamStats } from 'Actions'

// Helpers
import { nbaFlatStat, precisionRound } from 'Helpers'

const tenths = precisionRound(1)

// CSS
import './Overview.scss'

class TeamStats extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamStats(this.props.teamId)
  }

  render () {
    const { teamStats, teamDetails } = this.props

    if (!teamStats.length || !Object.keys(teamDetails).length) {
      return (
        <Card
          label="Team Stats"
          wrapperStyle={{
            textAlign: 'center',
            padding: '65px'
          }}
        >
          <Spinner lg show />
        </Card>
      )
    }

    const awayTeam = teamStats[0]

    return (
      <Card
        label="Team Stats"
        wrapperStyle={{
          padding: '35px'
        }}
      >
        <div styleName="team-stats">
          <div styleName="team-stats-row">
            <div styleName="team-stats-column team">
              <p className="label semibold" styleName="label">
                TEAM
              </p>

              <p styleName="value" className="semibold">
                {teamDetails.name}
              </p>
            </div>
          </div>

          <div styleName="team-stats-row stats">
            {
              Object.keys(awayTeam).map(stat => {
                if (!nbaFlatStat(stat).short) return null

                return (
                  <div key={stat} styleName="team-stats-column">
                    <p className="label semibold" styleName="label">
                      {nbaFlatStat(stat).short}
                    </p>

                    <p styleName="value">
                      {tenths(awayTeam[stat])}
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
  teamDetails: {}
}

TeamStats.propTypes = {
  teamStats: PropTypes.array,
  teamDetails: PropTypes.object,
  teamId: PropTypes.string.isRequired,
  fetchNBATeamStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  teamStats: routines.nba.teamStats,
  teamDetails: routines.nba.teamDetails
})

const mapDispatchToProps = {
  fetchNBATeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)