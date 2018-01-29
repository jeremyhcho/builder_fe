import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  MatchupSelector,
  MatchupDetails,
  MatchupLines,
  MatchupKeyStats,
  MatchupGraph
} from 'Components/GameDetails/Blocks'

const Matchup = ({ matchup }) => {
  return (
    <div>
      <Row>
        <MatchupSelector />
      </Row>

      {
        Object.keys(matchup).length ? (
          <div>
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

            <Row>
              <Col xs={12}>
                <MatchupGraph />
              </Col>
            </Row>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}

Matchup.defaultProps = {
  matchup: {}
}

Matchup.propTypes = {
  matchup: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  matchup: routines.nba.matchup
})

export default connect(
  mapStateToProps
)(Matchup)
