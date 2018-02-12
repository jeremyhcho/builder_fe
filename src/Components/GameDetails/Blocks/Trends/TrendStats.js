import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// CSS
import './Trends.scss'

// Actions
import { fetchNBATrends } from 'Actions'

// Helpers
import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

class TrendStats extends React.Component {
  componentDidMount () {
    this.props.fetchNBATrends(this.props.summary.id)
  }

  getTrendLabel (trend) {
    const splitTrend = trend.split('_')
    return splitTrend.map(word => word[0].toUpperCase() + word.substr(1)).join(' ')
  }

  calculateWinRate ({ wins, losses }) {
    const totalGames = wins + losses
    const winrate = tenths((wins / totalGames) * 100)
    if (winrate < 50) {
      return (
        <p className="semibold" style={{ color: 'var(--red)' }}>
          ({tenths((wins / totalGames) * 100)}%)
        </p>
      )
    }

    return (
      <p className="semibold" style={{ color: 'var(--green)' }}>
        ({tenths((wins / totalGames) * 100)}%)
      </p>
    )
  }

  render () {
    const { summary, trends } = this.props

    if (!Object.keys(trends).length) {
      return (
        <Row>
          <Col xs={6}>
            <Card label={`${summary.away.city} ${summary.away.name}`} wrapperStyle={{ padding: '65px' }}>
              <Row middle='xs' center='xs'>
                <Spinner lg show />
              </Row>
            </Card>
          </Col>

          <Col xs={6}>
            <Card label={`${summary.home.city} ${summary.home.name}`} wrapperStyle={{ padding: '65px' }}>
              <Row middle='xs' center='xs'>
                <Spinner lg show />
              </Row>
            </Card>
          </Col>
        </Row>
      )
    }

    return (
      <Row>
        {
          Object.keys(trends).map(team => (
            <Col xs={6} key={summary[team].team_id}>
              <Card label={`${summary[team].city} ${summary[team].name}`}>
                <Row middle='xs' center='xs' styleName="trends-section">
                  <Col xs={4}>
                    <p className="label small">TREND</p>
                  </Col>

                  <Col xs={4}>
                    <p className="label small">VS. SPREAD</p>
                    <p className="label small">(Win %)</p>
                  </Col>

                  <Col xs={4}>
                    <p className="label small">AVG. PTS</p>
                    <p className="small label">SCORED</p>
                  </Col>
                </Row>

                {
                  Object.keys(trends[team]).map(trendKey => {
                    const trendStat = trends[team][trendKey]
                    return (
                      <Row middle='xs' center='xs' styleName="trends-section" key={trendKey}>
                        <Col xs={4}>
                          <Row start='xs'>
                            <Col xsOffset={3}>
                              <p className="semibold">
                                {this.getTrendLabel(trendStat.trend)}
                              </p>
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={4}>
                          <div styleName="spread">
                            <p className="semibold">
                              {trendStat.record.wins}-
                              {trendStat.record.losses}-
                              {trendStat.record.ties}
                            </p>
                            {this.calculateWinRate(trendStat.record)}
                          </div>
                        </Col>

                        <Col xs={4}>
                          <p className="semibold">{trendStat.record.avg_points}</p>
                        </Col>
                      </Row>
                    )
                  })
                }
              </Card>
            </Col>
          ))
        }
      </Row>
    )
  }
}

TrendStats.defaultProps = {
  summary: {},
  trends: {}
}

TrendStats.propTypes = {
  summary: PropTypes.object,
  trends: PropTypes.object,
  fetchNBATrends: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  trends: routines.nba.trends,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBATrends
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendStats)
