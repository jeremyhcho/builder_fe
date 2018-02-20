import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components

// Helpers
import { ordinal } from 'Helpers'

// CSS
import './Overview.scss'

const TeamDetails = ({ teamDetails }) => {
  const getStreak = () => {
    const streakOutcome = teamDetails.streak[0].toUpperCase()

    if (streakOutcome === 'W') {
      return (
        <h4 className="semibold" style={{ color: 'var(--green)' }}>
          {streakOutcome}
          {teamDetails.streak.substr(1)}
        </h4>
      )
    }

    if (streakOutcome === 'L') {
      return (
        <h4 className="semibold" style={{ color: 'var(--dark-red)' }}>
          {streakOutcome}
          {teamDetails.streak.substr(1)}
        </h4>
      )
    }

    return (
      <h4 className="semibold">
        {streakOutcome}
        {teamDetails.streak.substr(1)}
      </h4>
    )
  }

  return (
    <Row styleName="team-details">
      <Col xs={12} styleName="header">
        <img src={teamDetails.image} style={{ width: '35px', height: '35px' }} />
        <p className="semibold" style={{ marginLeft: '10px' }}>
          {teamDetails.full_name}
        </p>
      </Col>

      <Row around='xs' styleName="details">
        <div styleName="details-card">
          <h4 className="semibold">{teamDetails.wins}</h4>
          <p className="semibold label">Wins</p>
        </div>

        <div styleName="details-card">
          <h4 className="semibold">{teamDetails.losses}</h4>
          <p className="semibold label">Losses</p>
        </div>

        <div styleName="details-card">
          <h4 className="semibold">{ordinal(teamDetails.standing)}</h4>
          <p className="semibold label">in {teamDetails.conference[0] + teamDetails.conference.substr(1).toLowerCase()}</p>
        </div>

        <div styleName="details-card">
          {getStreak()}
          <p className="semibold label">Streak</p>
        </div>

        <div styleName="details-card">
          <h4 className="semibold" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={teamDetails.next_match.image} style={{ width: '35px', height: '35px' }} />
          </h4>
          <p className="semibold label">Next Match</p>
        </div>
      </Row>
    </Row>
  )
}

TeamDetails.defaultProps = {
  teamDetails: {}
}

TeamDetails.propTypes = {
  teamDetails: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  teamDetails: routines.nba.teamDetails
})

export default connect(
  mapStateToProps
)(TeamDetails)
