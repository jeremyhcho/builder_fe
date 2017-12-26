import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import { Row } from 'react-styled-flexboxgrid'

// CSS
import './Teams.scss'

// Components
import { Spinner } from 'Components/Common'
import Conference from './Conference'

// Actions
import { fetchNBATeams } from 'Actions'

class Teams extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeams()
  }

  teamsGroupedByConference () {
    return groupBy(this.props.teams, (team) => team.conference)
  }

  render () {
    if (!this.props.teams.length) {
      return (
        <Row styleName='teams-container'>
          <Spinner
            show
            lg
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%'
            }}
          />
        </Row>
      )
    }

    const teamsGroupedByConference = this.teamsGroupedByConference()
    const westTeams = teamsGroupedByConference.WEST
    const eastTeams = teamsGroupedByConference.EAST

    return (
      <Row styleName='teams-container'>
        <Conference teams={westTeams} />
        <Conference teams={eastTeams} />
      </Row>
    )
  }
}

Teams.propTypes = {
  fetchNBATeams: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired
}

const mapStateToProps = ({ nbaTeams }) => ({
  teams: nbaTeams.teams
})

const mapDispatchToProps = {
  fetchNBATeams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams)
