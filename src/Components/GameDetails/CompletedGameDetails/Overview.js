import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  Summary,
  Quarters,
  GameLeaders,
  RecentGames,
  StartingLineup,
  VegasLines,
  Injuries
} from 'Components/GameDetails/Blocks'

const Overview = ({ match }) => (
  <Row style={{ maxWidth: '1300px', width: '100%' }}>
    <Col xs={12}>
      <Summary />
    </Col>

    <Col xs={12}>
      <Quarters matchId={match.params.id} />
    </Col>

    <Col xs={6}>
      <GameLeaders />
    </Col>

    <Col xs={6}>
      <VegasLines matchId={match.params.id} />
    </Col>

    <Col xs={7}>
      <StartingLineup matchId={match.params.id} />
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
