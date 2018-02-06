import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  Summary,
  StartingLineup,
  VegasLines,
  RecentGames,
  Injuries,
  TeamStats
} from 'Components/GameDetails/Blocks'

const Overview = ({ match }) => (
  <Row style={{ maxWidth: '1300px', width: '100%', paddingBottom: '65px' }}>
    <Col xs={12}>
      <Summary matchId={match.params.id} />
    </Col>

    <Col xs={12}>
      <TeamStats matchId={match.params.id} />
    </Col>

    <Col xs={6}>
      <StartingLineup matchId={match.params.id} />
    </Col>

    <Col xs={6}>
      <VegasLines matchId={match.params.id} />
    </Col>

    <Col xs={5}>
      <RecentGames matchId={match.params.id} />
    </Col>

    <Col xs={7}>
      <Injuries matchId={match.params.id} />
    </Col>
  </Row>
)

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
