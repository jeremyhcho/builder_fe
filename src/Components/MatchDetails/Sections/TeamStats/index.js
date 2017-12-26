import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import PointsGraph from './PointsGraph'
import Statistics from './Statistics'
import KeyStats from './KeyStats'

// CSS
import './TeamStats.scss'

const TeamStats = ({ match }) => (
  <div>
    <Row>
      <Col xs={12}>
        <PointsGraph idProp={match.params.id} />
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <Statistics idProp={match.params.id} />
      </Col>
      <Col xs={6} lg={5}>
        <KeyStats idProp={match.params.id} />
      </Col>
    </Row>
  </div>
)

TeamStats.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TeamStats
