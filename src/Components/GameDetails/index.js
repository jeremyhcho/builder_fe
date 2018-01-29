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
    console.log('GAMEDETAILS MOUNTED FETCHING SUMMARY')
    this.props.fetchNBASummary(this.props.match.params.id)
  }

  gameDetailsStatus () {
    const { summary, ...routerProps } = this.props
    console.log('rendering game: ', summary)
    if (summary.status === 'SCHEDULED' || summary.status === 'IN PROGRESS') {
      console.log('RENDERING A SCHEDULED GAME')
      return <ScheduledGameDetails {...routerProps} />
    } else if (summary.status === 'CLOSED') {
      console.log('RENDERING A COMPLETED GAME')
      return <CompletedGameDetails {...routerProps} />
    }
    return null
  }

  render () {
    const { summary } = this.props
    if (!Object.keys(summary).length) {
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

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBASummary
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
