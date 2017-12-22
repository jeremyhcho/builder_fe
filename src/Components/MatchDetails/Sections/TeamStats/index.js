import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { fetchNBATeamStats } from 'Actions'

class TeamStats extends React.Component {
  componentDidMount() {
    const { fetchNBATeamStats, match } = this.props
    fetchNBATeamStats(match.params.id)
  }

  render () {
    const { teamStats } = this.props
    console.log(teamStats)
    return (
      <div>
        TEAMSTATS
      </div>
    )
  }
}

TeamStats.defaultProps = {
  teamStats: {}
}

TeamStats.propTypes = {
  teamStats: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchNBATeamStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ matchDetails }) => ({
  teamStats: matchDetails.teamStats
})

const mapDispatchToProps = {
  fetchNBATeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
