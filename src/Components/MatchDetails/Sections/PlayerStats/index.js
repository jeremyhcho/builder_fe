import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import TeamPlayers from './TeamPlayers'

// Actions
import { fetchNBAPlayerStats } from 'Actions'

class PlayerStats extends React.Component {
  componentDidMount () {
    const { fetchNBAPlayerStats, match } = this.props
    fetchNBAPlayerStats(match.params.id)
  }

  render () {
    const { playerStats, summary } = this.props
    if (playerStats && summary) {
      return (
        <div>
          {
            Object.keys(playerStats).map(team => (
              <TeamPlayers
                key={team}
                players={playerStats[team]}
                teamName={summary[team].name}
              />
            ))
          }
        </div>
      )
    }
    return (
      <div>
        SPINNER
      </div>
    )
  }
}

PlayerStats.defaultProps = {
  playerStats: {},
  summary: {}
}

PlayerStats.propTypes = {
  playerStats: PropTypes.object,
  fetchNBAPlayerStats: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  summary: PropTypes.object
}

const mapStateToProps = ({ gameDetails }) => ({
  playerStats: gameDetails.playerStats.stats,
  summary: gameDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBAPlayerStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerStats)
