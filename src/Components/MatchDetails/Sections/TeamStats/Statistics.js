import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './TeamStats.scss'

const Statistics = ({ teamStats }) => {
  if (teamStats) {
    const stats = teamStats.totals
    return (
      <Card label="Statistics" wrapperStyle={{ padding: '40px' }} styleName="statistics">
        <Row center='xs'>
          <Row style={{ width: '100%' }}>
            <Col xs={3}>
              <p className="bold">{stats.away[0].name}</p>
            </Col>
            <Col xs={6}>
              <p className="bold">Stats</p>
            </Col>
            <Col xs={3}>
              <p className="bold">{stats.home[0].name}</p>
            </Col>
          </Row>
          <hr style={{ width: '100%', border: 0, height: '1px', backgroundColor: 'var(--gray)', margin: '15px 0' }} />
          <Row styleName="totals">
            <Col xs={3}>
              {
                Object.keys(stats.away[0].statistics).map(stat => {
                  const value = stats.away[0].statistics[stat]
                  return (
                    <p
                      key={stat}
                      className="semibold"
                      styleName="stat-value"
                    >
                      {typeof value === 'string' ? value : Math.round(value * 100) / 100}
                    </p>
                  )
                })
              }
            </Col>
            <Col xs={6}>
              {
                Object.keys(stats.away[0].statistics).map(stat => (
                  <p
                    key={stat}
                    styleName="stat-value"
                    className="semibold label"
                  >
                    {stat}
                  </p>
                ))
              }
            </Col>
            <Col xs={3}>
              {
                Object.keys(stats.away[0].statistics).map(stat => {
                  const value = stats.away[0].statistics[stat]
                  return (
                    <p
                      key={stat}
                      className="semibold"
                      styleName="stat-value"
                    >
                      {typeof value === 'string' ? value : Math.round(value * 100) / 100}
                    </p>
                  )
                })
              }
            </Col>
          </Row>
        </Row>
      </Card>
    )
  }
  return (
    <div>
      TEAMSTATISTICS LOADER SPINNER TIHNGY HERE...
    </div>
  )
}

Statistics.defaultProps = {
  teamStats: {}
}

Statistics.propTypes = {
  teamStats: PropTypes.object
}

const mapStateToProps = ({ gameDetails }) => ({
  teamStats: gameDetails.teamStats.stats,
})

export default connect(
  mapStateToProps,
  null
)(Statistics)
