import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { fetchNBACompletedTeamStats } from 'Actions'

class TeamStats extends React.Component {
  componentDidMount () {
    this.props.fetchNBACompletedTeamStats()
  }

  render () {
    console.log(this.props.teamStats, this.props.summary)
    return (
      <div />
    )
  }
}

TeamStats.defaultProps = {
  teamStats: {},
  summary: {}
}

TeamStats.propTypes = {
  teamStats: PropTypes.object,
  summary: PropTypes.object,
  fetchNBACompletedTeamStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  teamStats: routines.nba.teamStats
})

const mapDispatchToProps = {
  fetchNBACompletedTeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
