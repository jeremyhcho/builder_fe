import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'
import OverviewSpinner from 'Components/GameDetails/Blocks/OverviewSpinner'

// CSS
import './Overview.scss'

const wrapperStyle = {
  padding: '50px 25px',
  height: '212px'
}

const Summary = ({ summary }) => (
  <div>
    {
      summary ? (
        <Card label="Summary" wrapperStyle={wrapperStyle}>
          <Row middle='xs' center='xs' style={{ height: '100%', position: 'relative' }}>
            <div
              styleName='summary away'
              style={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translateY(-50%) translateX(-78px)'
              }}
            >
              <div>
                <p className="label small">{summary.away.city}</p>
                <h2 className="semibold">{summary.away.name.toUpperCase()}</h2>
                <p className="label small">{summary.away.wins}-{summary.away.losses}</p>
              </div>
              <h1 styleName="points away" className="bold">{summary.away.points}</h1>
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
              styleName='summary home'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(78px)'
              }}
            >
              <div>
                <p className="label small">{summary.home.city}</p>
                <h2 className="semibold">{summary.home.name.toUpperCase()}</h2>
                <p className="label small">{summary.home.wins}-{summary.home.losses}</p>
              </div>
              <h1 styleName='points home' className="bold">{summary.home.points}</h1>
            </div>
          </Row>
        </Card>
      ) : (
        <OverviewSpinner label="Summary" />
      )
    }
  </div>
)

Summary.propTypes = {
  summary: PropTypes.object.isRequired
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary
})

export default connect(
  mapStateToProps,
)(Summary)
