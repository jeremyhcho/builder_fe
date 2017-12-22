import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { Line } from 'react-chartjs-2'

// Components
// import { Selects } from 'Components/Common'

// CSS
import './TeamStats.scss'

// Actions
import { fetchNBATeamStats } from 'Actions'

class TeamStats extends React.Component {
  componentDidMount() {
    const { fetchNBATeamStats, match } = this.props
    fetchNBATeamStats(match.params.id)
  }

  render () {
    const { teamStats } = this.props
    if (teamStats) {
      return (
        <div>
          <h1>LINE GRAPH HERE</h1>
        </div>
      )
    }
    return (
      <div>
        SPINNER SPINNER TEAM STATS SPINNER SPINNER
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
