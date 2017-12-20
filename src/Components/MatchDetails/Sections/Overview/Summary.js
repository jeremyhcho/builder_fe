import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBASummary } from 'Actions'

class Summary extends React.Component {
  componentWillMount() {
    this.props.fetchNBASummary(this.props.match.params.id)
  }

  renderSummary() {
    const { summary, fetchingSummary } = this.props
    if (fetchingSummary) {
      return <Spinner lg show />
    }
    return (
      <Row>
        <Row>
          <Col xs={6}>
            <p>{summary.away_team.city}</p>
            <p>{summary.away_team.name}</p>
            <p>{summary.away_team.points}</p>
          </Col>
          <Col xs={6}>
            <p>{summary.home_team.city}</p>
            <p>{summary.home_team.name}</p>
            <p>{summary.home_team.points}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Card>
              <p>{summary.away_team.leaders.assists.key}</p>
              <h1>{summary.away_team.leaders.assists.value}</h1>
              <h1>{summary.away_team.leaders.assists.name}</h1>
            </Card>
          </Col>
          <Col xs={4}>
            <Card>
              <p>{summary.away_team.leaders.points.key}</p>
              <h1>{summary.away_team.leaders.points.value}</h1>
              <h1>{summary.away_team.leaders.points.name}</h1>
            </Card>
          </Col>
          <Col xs={4}>
            <Card>
              <p>{summary.away_team.leaders.rebounds.key}</p>
              <h1>{summary.away_team.leaders.rebounds.value}</h1>
              <h1>{summary.away_team.leaders.rebounds.name}</h1>
            </Card>
          </Col>
        </Row>
      </Row>
    )
  }

  render () {
    return (
      <Card label="Summary">
        {this.renderSummary()}
      </Card>
    )
  }
}

Summary.defaultProps = {
  summary: {}
}

Summary.propTypes = {
  summary: PropTypes.object,
  fetchNBASummary: PropTypes.func.isRequired,
  fetchingSummary: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = ({ matchDetails }) => ({
  summary: matchDetails.overview.summary,
  fetchingSummary: matchDetails.overview.fetchingSummary
})

const mapDispatchToProps = {
  fetchNBASummary
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Summary))
