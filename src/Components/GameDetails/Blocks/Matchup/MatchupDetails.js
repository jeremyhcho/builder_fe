import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col } from 'react-styled-flexboxgrid'

// Component
import { Card, Button } from 'Components/Common'
import { OverviewSpinner } from 'Components/GameDetails/Blocks'

// CSS
import './Matchup.scss'

const wrapperStyle = {
  padding: '50px 25px',
  height: '140px'
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
      <div style={{ position: 'relative' }}>
        <Button
          style={{ position: 'absolute', top: '-15px', right: '0' }}
          secondary
          onClick={this.routeToMatch}
        >
          View
        </Button>
        <Card label="Match Details" wrapperStyle={wrapperStyle}>
          <Row middle='xs' style={{ height: '100%', position: 'relative' }}>
            <Col xs={4}>
              <div style={{ textAlign: 'right' }}>
                <p className="label small">{matchup.away.city}</p>
                <h2 className="semibold">{matchup.away.name.toUpperCase()}</h2>
                <p className="label small">{matchup.away.wins}-{matchup.away.losses}</p>
              </div>
            </Col>

            <Col xs={4}>
              <Row center='xs' between='xs'>
                <Col xs={4}>
                  <h1 styleName="points away" className="bold">{matchup.away.points}</h1>
                </Col>

                <Col xs={4}>
                  <h1 className='semibold'>@</h1>
                </Col>

                <Col xs={4}>
                  <h1 styleName='points home' className="bold">{matchup.home.points}</h1>
                </Col>
              </Row>
            </Col>

            <Col xs={4}>
              <div>
                <p className="label small">{matchup.home.city}</p>
                <h2 className="semibold">{matchup.home.name.toUpperCase()}</h2>
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
