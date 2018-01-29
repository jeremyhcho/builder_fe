import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Component
import { Card } from 'Components/Common'
import { OverviewSpinner } from 'Components/GameDetails/Blocks'

// CSS
import './Matchup.scss'

const wrapperStyle = {
  padding: '50px 25px',
  height: '140px'
}

class MatchupDetails extends React.Component {
  render () {
    const { matchup } = this.props

    if (!Object.keys(matchup).length) {
      return <OverviewSpinner label="Match Details" />
    }

    return (
      <div>
        <Card label="Match Details" wrapperStyle={wrapperStyle}>
          <Row middle='xs' center='xs' style={{ height: '100%', position: 'relative' }}>
            <div
              styleName='matchup away'
              style={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translateY(-50%) translateX(-78px)'
              }}
            >
              <div>
                <p className="label small">{matchup.away.city}</p>
                <h2 className="semibold">{matchup.away.name.toUpperCase()}</h2>
                <p className="label small">{matchup.away.wins}-{matchup.away.losses}</p>
              </div>
              <h1 styleName="points away" className="bold">{matchup.away.points}</h1>
            </div>

            <h1
              className='semibold'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              @
            </h1>

            <div
              styleName='matchup home'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(78px)'
              }}
            >
              <div>
                <p className="label small">{matchup.home.city}</p>
                <h2 className="semibold">{matchup.home.name.toUpperCase()}</h2>
                <p className="label small">{matchup.home.wins}-{matchup.home.losses}</p>
              </div>
              <h1 styleName='points home' className="bold">{matchup.home.points}</h1>
            </div>
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
  matchup: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  matchup: routines.nba.matchup
})

export default connect(
  mapStateToProps
)(MatchupDetails)
