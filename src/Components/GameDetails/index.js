import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

// Components
// import { Spinner } from 'Components/Common'
import CompletedGameDetails from './CompletedGameDetails'
import ScheduledGameDetails from './ScheduledGameDetails'

// CSS
import './GameDetails.scss'

// Actions
import { fetchNBASummary } from 'Actions'

class GameDetails extends React.Component {
  state = {
    fetchingNewSummary: false
  }

  componentDidMount () {
    this.props.fetchNBASummary(this.props.match.params.id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        fetchingNewSummary: true
      }, () => {
        newProps.fetchNBASummary(newProps.match.params.id)
      })
    }

    if (newProps.summary.id !== this.props.summary.id) {
      this.setState({ fetchingNewSummary: false })
    }
  }

  render () {
    const { summary } = this.props
    const { fetchingNewSummary } = this.state

    if (!Object.keys(summary).length || fetchingNewSummary) {
      // return <div className="loader"><Spinner lg show /></div>
      return <div />
    }

    return (
      <Switch>
        {
          summary.status === 'SCHEDULED' || summary.status === 'INPROGRESS' ? (
            <Route path='/games/:id' component={ScheduledGameDetails} />
          ) : (
            <Route path='/games/:id' component={CompletedGameDetails} />
          )
        }
      </Switch>
    )
  }
}

GameDetails.defaultProps = {
  summary: {}
}

GameDetails.propTypes = {
  match: PropTypes.object.isRequired,
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
