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
  const getMatchType = (game) => {
    if (game.match_type === 'HOME') {
      return 'vs'
    }

    return '@'
  }

  return (
    <Row styleName="team-details">
      <Col xs={12} styleName="header">
        <p className="semibold">{teamDetails.full_name}</p>
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
          <h4 className="semibold">
            {teamDetails.streak.substr(1)}
            {teamDetails.streak[0].toUpperCase()}
          </h4>
          <p className="semibold label">Streak</p>
        </div>

        <div styleName="details-card">
          <h4 className="semibold">{getMatchType(teamDetails.next_match)} {teamDetails.next_match.short_name}</h4>
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
