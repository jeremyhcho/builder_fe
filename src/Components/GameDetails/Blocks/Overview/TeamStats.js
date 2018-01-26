import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { fetchNBATeamStats } from 'Actions'

class TeamStats extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamStats(this.props.summary.id)
  }

  render () {
    console.log(this.props.teamStats)
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
