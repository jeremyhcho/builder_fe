import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import { Spinner } from 'Components/Common'
import { TeamPlayers } from 'Components/GameDetails/Blocks'

// Actions
import { fetchNBAPlayerStats } from 'Actions'

// Selectors
import { makeSortPlayerStats } from 'Helpers/Selectors'

class PlayerStats extends React.Component {
  componentDidMount () {
    this.props.fetchNBAPlayerStats(this.props.match.params.id)
  }

  render () {
    const { sortedPlayerStats, summary } = this.props

    if (sortedPlayerStats && summary) {
      return (
        <div style={{ maxWidth: '1300px', width: '100%', paddingBottom: '100px' }}>
          {
            Object.keys(sortedPlayerStats).map(team => (
              <TeamPlayers
                key={team}
                teamType={team}
                players={sortedPlayerStats[team]}
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
  sortedPlayerStats: null,
  summary: null
}

PlayerStats.propTypes = {
  sortedPlayerStats: PropTypes.object,
  fetchNBAPlayerStats: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  summary: PropTypes.object
}

const makeMapStateToProps = () => {
  const getSortedPlayerStats = makeSortPlayerStats()
  const mapStateToProps = ({ routines, nba }) => ({
    sortedPlayerStats: getSortedPlayerStats({ routines, nba }),
    summary: routines.nba.summary
  })

  return mapStateToProps
}

const mapDispatchToProps = {
  fetchNBAPlayerStats
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PlayerStats)
