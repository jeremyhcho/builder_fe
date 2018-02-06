import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// CSS
import './TeamStats.scss'

// Helpers
import { nbaFlatStat, precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const Statistics = ({ teamMatchStats }) => {
  if (teamMatchStats) {
    const stats = teamMatchStats.totals
    return (
      <Card label="Statistics" wrapperStyle={{ padding: '40px' }} styleName="statistics">
        <Row center='xs'>
          <Row style={{ width: '100%' }} around='xs'>
            <Col style={{ textAlign: 'right' }}>
              <p className="small label">{stats.away.city}</p>
              <p className="semibold">{stats.away.name}</p>
            </Col>

            <Col style={{ textAlign: 'left' }}>
              <p className="small label">{stats.home.city}</p>
              <p className="semibold">{stats.home.name}</p>
            </Col>
          </Row>
          <hr style={{ width: '100%', border: 0, height: '1px', backgroundColor: 'var(--gray)', margin: '15px 0' }} />

          <div styleName="totals">
            {
              Object.keys(stats.away.statistics).map(stat => {
                if (!nbaFlatStat(stat).full) return null
                const awayValue = stats.away.statistics[stat]
                const homeValue = stats.home.statistics[stat]
                return (
                  <Col xs={12} key={stat} styleName="total-row">
                    <Row middle='xs'>
                      <Col xs={3}>
                        {tenths((awayValue * 100) / 100)}
                      </Col>

                      <Col xs={6}>
                        <p className="semibold label">
                          {nbaFlatStat(stat).full}
                        </p>
                      </Col>

                      <Col xs={3}>
                        {tenths((homeValue * 100) / 100)}
                      </Col>
                    </Row>
                  </Col>
                )
              })
            }
          </div>
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
  teamMatchStats: null
}

Statistics.propTypes = {
  teamMatchStats: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  teamMatchStats: routines.nba.teamMatchStats,
})

export default connect(
  mapStateToProps
)(Statistics)
