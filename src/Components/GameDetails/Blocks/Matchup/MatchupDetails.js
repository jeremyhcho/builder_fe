import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Component
import { Card, QuartzLink } from 'Components/Common'
import { OverviewSpinner } from 'Components/GameDetails/Blocks'

// Icons
import RightArrowIcon from 'Assets/Icons/right-arrow.svg'
import BlueRightArrowIcon from 'Assets/Icons/blue-right-arrow.svg'
import AtSign from 'Assets/Icons/at-sign.svg'

// CSS
import './Matchup.scss'

const wrapperStyle = {
  padding: '50px 25px',
  height: '140px'
}

const teamNameStyle = {
  textOverflow: 'clip',
  overflowX: 'auto',
  whiteSpace: 'nowrap'
}

class MatchupDetails extends React.Component {
  state = {
    viewHover: false
  }

  routeToMatch = (matchId) => {
    this.props.history.push(`/games/${matchId}/overview`)
  }

  render () {
    const { matchup } = this.props

    if (!Object.keys(matchup).length) {
      return <OverviewSpinner label="Match Details" />
    }

    return (
      <div styleName="matchup-details">
        <QuartzLink to={{ pathname: `/games/${matchup.id}/overview` }}>
          <div
            className="semibold"
            styleName="view-button"
            onMouseEnter={() => this.setState({ viewHover: true })}
            onMouseLeave={() => this.setState({ viewHover: false })}
          >
            View
            {
              this.state.viewHover ? <BlueRightArrowIcon styleName="arrow-icon" />
                : <RightArrowIcon styleName="arrow-icon" />
            }
          </div>
        </QuartzLink>

        <Card
          subText={
            <p
              className='small'
              style={{
                padding: '4px 8px',
                backgroundColor: 'var(--navy-blue)',
                color: '#FFF',
                borderRadius: 'var(--border-radius)',
                margin: '0 0 4px 12px'
              }}
            >
              {moment.tz(new Date(matchup.date), 'America/New_York').format('ddd, MMM D, YYYY')}
            </p>
          }
          wrapperStyle={wrapperStyle}
        >
          <Row middle='xs' style={{ height: '100%', position: 'relative' }}>
            <Col xs={4} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <img
                  src={matchup.away.image}
                  style={{
                    width: '35px',
                    height: '35px',
                    marginRight: '15px'
                  }}
                />

                <div style={{ display: 'inline-block' }}>
                  <p className="label small">{matchup.away.city}</p>
                  <h2 className="semibold" style={teamNameStyle}>{matchup.away.name.toUpperCase()}</h2>
                  <p className="label small">{matchup.away.wins}-{matchup.away.losses}</p>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <Row center='xs' around='xs'>
                <h2 styleName="points away" className="bold">{matchup.away.points}</h2>
                <h2 className='semibold'><AtSign width={16} height={16} /></h2>
                <h2 styleName='points home' className="bold">{matchup.home.points}</h2>
              </Row>
            </Col>

            <Col xs={4}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'inline-block' }}>
                  <p className="label small">{matchup.home.city}</p>
                  <h2 className="semibold" style={teamNameStyle}>{matchup.home.name.toUpperCase()}</h2>
                  <p className="label small">{matchup.home.wins}-{matchup.home.losses}</p>
                </div>

                <img
                  src={matchup.home.image}
                  style={{
                    width: '35px',
                    height: '35px',
                    marginLeft: '15px'
                  }}
                />
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
