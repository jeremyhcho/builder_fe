import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import CompletedGameDetails from './CompletedGameDetails'
import ScheduledGameDetails from './ScheduledGameDetails'

// CSS
import './GameDetails.scss'

// Actions
import { fetchNBASummary } from 'Actions'

class GameDetails extends React.Component {
  componentDidMount () {
    this.props.fetchNBASummary(this.props.match.params.id)
  }

  gameDetailsStatus () {
    const { summary, ...routerProps } = this.props
    if (summary.status === 'SCHEDULED') {
      return <ScheduledGameDetails {...routerProps} />
    } else if (summary.status === 'CLOSED') {
      return <CompletedGameDetails {...routerProps} />
    }
    return null
  }

  render () {
    const { summary } = this.props
    if (!summary) {
      return null
    }
    return this.gameDetailsStatus()
  }
}

GameDetails.defaultProps = {
  summary: {}
}

GameDetails.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchNBASummary: PropTypes.func.isRequired,
  summary: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBASummary
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
