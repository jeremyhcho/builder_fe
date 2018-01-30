import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  PointsGraph,
  Statistics,
  KeyStats
} from 'Components/GameDetails/Blocks'

const TeamStats = ({ match }) => (
  <div style={{ maxWidth: '1300px', width: '100%' }}>
    <Row>
      <Col xs={12}>
        <PointsGraph matchId={match.params.id} />
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <Statistics matchId={match.params.id} />
      </Col>
      <Col xs={6}>
        <KeyStats matchId={match.params.id} />
      </Col>
    </Row>
  </div>
)

TeamStats.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TeamStats
