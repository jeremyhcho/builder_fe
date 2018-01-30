import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  MatchupSelector,
  MatchupDetails,
  MatchupLines,
  MatchupKeyStats,
  MatchupGraph
} from 'Components/GameDetails/Blocks'

const Matchup = () => {
  return (
    <div style={{ maxWidth: '1300px', width: '100%', paddingBottom: '100px' }}>
      <Row>
        <MatchupSelector />
      </Row>

      <Row>
        <Col xs={6}>
          <Row>
            <Col xs={12}>
              <MatchupDetails />
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <MatchupLines />
            </Col>
          </Row>
        </Col>

        <Col xs={6}>
          <MatchupKeyStats />
        </Col>
      </Row>

      <Col xs={12}>
        <MatchupGraph />
      </Col>
    </div>
  )
}

export default Matchup
