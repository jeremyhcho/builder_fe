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
      <Quarters idProp={match.params.id} />
    </Col>

    <Col xs={6}>
      <GameLeaders />
    </Col>

    <Col xs={6}>
      <VegasLines idProp={match.params.id} />
    </Col>

    <Col xs={7}>
      <StartingLineup idProp={match.params.id} />
    </Col>

    <Col xs={5}>
      <RecentGames idProp={match.params.id} />
    </Col>

    <Col xs={7}>
      <Injuries idProp={match.params.id} />
    </Col>
  </Row>
)

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
