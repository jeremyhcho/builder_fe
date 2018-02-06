import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import TeamDetails from './TeamDetails'
import TeamStats from './TeamStats'
import TeamAts from './TeamAts'

// CSS
import './Overview.scss'

const Overview = ({ match }) => (
  <Row styleName="team-overview">
    <Col xs={12}>
      <TeamDetails />
    </Col>

    <Col xs={12}>
      <TeamStats teamId={match.params.id} />
    </Col>

    <Col xs={12}>
      <TeamAts teamId={match.params.id} />
    </Col>
  </Row>
)

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
