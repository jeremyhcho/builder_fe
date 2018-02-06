import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './Teams.scss'

// Components
import { Spinner, DocumentTitle } from 'Components/Common'
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
    if (!this.props.teams.length || this.props.fetchingNBATeams) {
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
      <DocumentTitle title='Quartz - NBA Teams' header='Teams'>
        <Row style={{ height: '100%' }}>
          <Col xs={12}>
            <Row styleName='teams-container'>
              <Conference teams={westTeams} />
              <Conference teams={eastTeams} />
            </Row>
          </Col>
        </Row>
      </DocumentTitle>
    )
  }
}

Teams.defaultProps = {
  teams: [],
  fetchingNBATeams: false
}

Teams.propTypes = {
  fetchNBATeams: PropTypes.func.isRequired,
  fetchingNBATeams: PropTypes.bool,
  teams: PropTypes.array
}

const mapStateToProps = ({ routines }) => ({
  teams: routines.nba.teams,
  fetchingNBATeams: routines.callingApi.UPDATE_NBA_TEAMS
})

const mapDispatchToProps = {
  fetchNBATeams
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams)
