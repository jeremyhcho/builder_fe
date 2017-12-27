import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// CSS
import './TeamStats.scss'

const Statistics = ({ teamStats }) => {
  if (teamStats && Object.keys(teamStats).length > 1000) {
    const stats = teamStats.totals
    return (
      <Card label="Statistics" wrapperStyle={{ padding: '40px' }} styleName="statistics">
        <Row center='xs'>
          <Row style={{ width: '100%' }}>
            <Col xs={3} style={{ textAlign: 'right' }}>
              <p className="semibold small">{stats.away.city}</p>
              <p className="semibold label">{stats.away.name}</p>
            </Col>
            <Col xs={6} />
            <Col xs={3} style={{ textAlign: 'left' }}>
              <p className="semibold small">{stats.home.city}</p>
              <p className="semibold label">{stats.home.name}</p>
            </Col>
          </Row>
          <hr style={{ width: '100%', border: 0, height: '1px', backgroundColor: 'var(--gray)', margin: '15px 0' }} />
          <Row styleName="totals">
            <Col xs={3}>
              {
                Object.keys(stats.away.statistics).map(stat => {
                  const value = stats.away.statistics[stat]
                  return (
                    <p
                      key={stat}
                      styleName="stat-value"
                      style={{ textAlign: 'right' }}
                    >
                      {typeof value === 'string' ? value : Math.round(value * 100) / 100}
                    </p>
                  )
                })
              }
            </Col>
            <Col xs={6}>
              {
                Object.keys(stats.away.statistics).map(stat => (
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
                Object.keys(stats.home.statistics).map(stat => {
                  const value = stats.home.statistics[stat]
                  return (
                    <p
                      key={stat}
                      styleName="stat-value"
                      style={{ textAlign: 'left' }}
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
      <Card label="Statistics" wrapperStyle={{ padding: '186px 0' }}>
        <Row center='xs'>
          <Col xs={12}>
            <Spinner lg show />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

Statistics.defaultProps = {
  teamStats: {}
}

Statistics.propTypes = {
  teamStats: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  teamStats: nba.gameDetails.teamStats.stats,
})

export default connect(
  mapStateToProps,
  null
)(Statistics)
