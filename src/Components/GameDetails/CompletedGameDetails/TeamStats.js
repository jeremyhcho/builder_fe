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
  <div style={{ maxWidth: '1300px' }}>
    <Row>
      <Col xs={12}>
        <PointsGraph idProp={match.params.id} />
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <Statistics idProp={match.params.id} />
      </Col>
      <Col xs={6}>
        <KeyStats idProp={match.params.id} />
      </Col>
    </Row>
  </div>
)

TeamStats.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TeamStats
