import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import uniqueId from 'lodash/uniqueid'

// Components
import { Card, ButtonGroup } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// CSS
import './Overview.scss'

const Headers = {
  points: ['PTS', 'FG', 'FT'],
  rebounds: ['REB', 'OREB', 'DREB'],
  assists: ['AST', 'TO', 'MIN']
}

const buttons = [
  { label: 'Points', key: 'points' },
  { label: 'Assists', key: 'assists' },
  { label: 'Rebounds', key: 'rebounds' }
]

class GameLeaders extends React.Component {
  state = {
    selected: 'points'
  }

  valueFactory (matchType) {
    const { summary } = this.props
    const stats = summary[matchType].leaders[this.state.selected].stats
    const values = {
      points: [
        stats.points,
        `${stats.field_goals_made}/${stats.field_goals_att}`,
        `${stats.free_throws_made}/${stats.free_throws_att}`
      ],
      rebounds: [
        stats.rebounds,
        stats.offensive_rebounds,
        stats.defensive_rebounds
      ],
      assists: [
        stats.assists,
        stats.turnovers,
        `${stats.minutes.split(':')[0]}`
      ]
    }

    return values[this.state.selected]
  }

  render () {
    const { summary } = this.props
    const { selected } = this.state
    return (
      <div>
        {
          summary ? (
            <Card label="Game Leaders" wrapperStyle={{ padding: '25px' }}>
              <Row middle='xs'>
                <ButtonGroup
                  buttons={buttons}
                  onChange={(e, button) => this.setState({ selected: button.key })}
                  defaultKey="points"
                />
              </Row>

              <div styleName="stat-container">
                <Row between='xs' center='xs' middle='xs' styleName="stat-label">
                  <Col xs={5} />
                  {Headers[selected].map(stat => (
                    <Col xs={2} key={stat}>
                      <p className="semibold label small" key={stat}>{stat}</p>
                    </Col>
                  ))}
                </Row>
                <Row between='xs' center='xs' middle='xs' styleName="stats">
                  <Col xs={5}>
                    <Row middle='xs'>
                      <p styleName="stat-position" className="label small">{summary.away.leaders[selected].position}</p>
                      <p className="semibold">
                        {summary.away.leaders[selected].first_name.slice(0, 1)}. {' '}
                        {summary.away.leaders[selected].last_name}
                      </p>
                    </Row>
                  </Col>
                  {
                    this.valueFactory('away').map(stat => {
                      return (
                        <Col xs={2} key={uniqueId('stat_container')}>
                          <p className="bold" key={uniqueId('stat_')}>{stat}</p>
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>

              <div styleName="stat-container">
                <Row between='xs' center='xs' middle='xs' styleName="stat-label">
                  <Col xs={5} />
                </Row>
                <Row between='xs' center='xs' middle='xs' styleName="stats">
                  <Col xs={5}>
                    <Row middle='xs'>
                      <p styleName="stat-position" className="label small">{summary.home.leaders[selected].position}</p>
                      <p className="semibold">
                        {summary.home.leaders[selected].first_name.slice(0, 1)}. {' '}
                        {summary.home.leaders[selected].last_name}
                      </p>
                    </Row>
                  </Col>
                  {
                    this.valueFactory('home').map(stat => {
                      return (
                        <Col key={uniqueId('stat_container')} xs={2}>
                          <p className="bold" key={uniqueId('stat_')}>{stat}</p>
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </Card>
          ) : (
            <OverviewSpinner label="Game Leaders" />
          )
        }
      </div>
    )
  }
}

GameLeaders.defaultProps = {
  summary: {}
}

GameLeaders.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ matchDetails }) => ({
  summary: matchDetails.overview.summary
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLeaders)
