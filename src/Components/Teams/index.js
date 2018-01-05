import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import { Row, Col } from 'react-styled-flexboxgrid'

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
    if (!this.props.teams.length || this.props.teams.length) {
      return (
        <div className="loader">
          <Spinner show lg />
        </div>
      )
    }

    const teamsGroupedByConference = this.teamsGroupedByConference()
    const westTeams = teamsGroupedByConference.WEST
    const eastTeams = teamsGroupedByConference.EAST

    return (
      <Row style={{ overflowY: 'scroll', height: '100%' }}>
        <Col xs={12}>
          <Row styleName='teams-container'>
            <Conference teams={westTeams} />
            <Conference teams={eastTeams} />
          </Row>
        </Col>
      </Row>
    )
  }
}

Teams.propTypes = {
  fetchNBATeams: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired
}

const mapStateToProps = ({ nba }) => ({
  teams: nba.teams.teamsList
})

const mapDispatchToProps = {
  fetchNBATeams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams)
