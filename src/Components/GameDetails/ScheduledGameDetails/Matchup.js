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

// Icons
import NoMeetingsIcon from 'Assets/Icons/missing-content.svg'

const missingOverlay = {
  opacity: '0.2',
  position: 'absolute',
  left: '50%',
  top: '10%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Matchup = ({ previousMeetings, summary }) => {
  const renderMatchupBlocks = () => {
    if (!previousMeetings) {
      return null
    }

    return previousMeetings.length ? (
      <Row>
        <Col xs={12}>
          <MatchupDetails />
        </Col>

        <Col xs={12}>
          <MatchupGraph />
        </Col>

        <Col xs={6}>
          <MatchupLines />
        </Col>

        <Col xs={6} style={{ paddingBottom: '35px' }}>
          <MatchupKeyStats />
        </Col>
      </Row>
    ) : (
      <Row style={{ position: 'relative', height: '100%' }}>
        <div style={missingOverlay}>
          <div style={{ textAlign: 'center' }}>
            <NoMeetingsIcon width={256} height={256} />

            <h1 className="semibold">
              No previous matches found
            </h1>

            <p className="semibold">
              This is the first match between {summary.away.city} {summary.away.name}
              {' '} and {summary.home.city} {summary.home.name} this season
            </p>
          </div>
        </div>
      </Row>
    )
  }

  return (
    <div style={{ maxWidth: '1300px', width: '100%', height: '100%', paddingBottom: '65px' }}>
      <Row>
        <MatchupSelector />
      </Row>

      {renderMatchupBlocks()}
    </div>
  )
}

Matchup.defaultProps = {
  previousMeetings: null,
  summary: {}
}

Matchup.propTypes = {
  previousMeetings: PropTypes.array,
  summary: PropTypes.object,
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  previousMeetings: routines.nba.previousMeetings
})

export default connect(
  mapStateToProps
)(Matchup)
