import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import { Spinner } from 'Components/Common'
import { TeamPlayers } from 'Components/GameDetails/Blocks'

// Actions
import { fetchNBAPlayerStats } from 'Actions'

class PlayerStats extends React.Component {
  componentDidMount () {
    this.props.fetchNBAPlayerStats(this.props.match.params.id)
  }

  render () {
    const { playerStats, summary } = this.props

    if (playerStats && summary) {
      return (
        <div style={{ maxWidth: '1300px', width: '100%' }}>
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
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spinner lg show />
      </div>
    )
  }
}

PlayerStats.defaultProps = {
  playerStats: null,
  summary: null
}

PlayerStats.propTypes = {
  playerStats: PropTypes.object,
  fetchNBAPlayerStats: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  summary: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  playerStats: routines.nba.playerStats,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAPlayerStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerStats)
