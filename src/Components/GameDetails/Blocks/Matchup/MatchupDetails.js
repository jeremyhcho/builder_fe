import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col } from 'react-styled-flexboxgrid'

// Component
import { Card } from 'Components/Common'
import { OverviewSpinner } from 'Components/GameDetails/Blocks'

// Icons
import RightArrowIcon from 'Assets/Icons/right-arrow.svg'

// CSS
import './Matchup.scss'

const wrapperStyle = {
  padding: '50px 25px',
  height: '140px'
}

const teamNameStyle = {
  textOverflow: 'clip',
  overflowX: 'scroll',
  whiteSpace: 'nowrap'
}

class MatchupDetails extends React.Component {
  routeToMatch = () => {
    this.props.history.push(`/games/${this.props.matchup.id}/overview`)
  }

  render () {
    const { matchup } = this.props

    if (!Object.keys(matchup).length) {
      return <OverviewSpinner label="Match Details" />
    }

    return (
      <div styleName="match-details">
        <div
          className="semibold"
          styleName="view-button"
          onClick={this.routeToMatch}
        >
          View
          <RightArrowIcon styleName="arrow-icon" />
        </div>
        <Card label="Match Details" wrapperStyle={wrapperStyle}>
          <Row middle='xs' style={{ height: '100%', position: 'relative' }}>
            <Col xs={4}>
              <div style={{ textAlign: 'right' }}>
                <p className="label small">{matchup.away.city}</p>
                <h4 className="semibold" style={teamNameStyle}>{matchup.away.name.toUpperCase()}</h4>
                <p className="label small">{matchup.away.wins}-{matchup.away.losses}</p>
              </div>
            </Col>

            <Col xs={4}>
              <Row center='xs' around='xs'>
                <h2 styleName="points away" className="bold">{matchup.away.points}</h2>
                <h2 className='semibold'>@</h2>
                <h2 styleName='points home' className="bold">{matchup.home.points}</h2>
              </Row>
            </Col>

            <Col xs={4}>
              <div>
                <p className="label small">{matchup.home.city}</p>
                <h4 className="semibold" style={teamNameStyle}>{matchup.home.name.toUpperCase()}</h4>
                <p className="label small">{matchup.home.wins}-{matchup.home.losses}</p>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

MatchupDetails.defaultProps = {
  matchup: {}
}

MatchupDetails.propTypes = {
  matchup: PropTypes.object,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ routines }) => ({
  matchup: routines.nba.matchup
})

export default withRouter(connect(
  mapStateToProps
)(MatchupDetails))
