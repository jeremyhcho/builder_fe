import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, ButtonGroup, Tooltip } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// CSS
import './Overview.scss'

// Helpers
import { nbaFlatStat } from 'Helpers'

const statHeaders = {
  points: ['points', 'field_goals_made', 'free_throws_made'],
  rebounds: ['rebounds', 'offensive_rebounds', 'defensive_rebounds'],
  assists: ['assists', 'turnovers', 'minutes']
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

    if (!summary) {
      return <OverviewSpinner label="Game Leaders" />
    }

    return (
      <div>
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

              {
                statHeaders[selected].map((stat, i) => (
                  <Col xs={2} key={stat} data-tip-for={`${statHeaders[selected][i]}`}>
                    <p className="semibold label small" key={stat}>{nbaFlatStat(stat).short}</p>
                    <Tooltip pos="top" id={`${statHeaders[selected][i]}`}>
                      {nbaFlatStat(stat).full}
                    </Tooltip>
                  </Col>
                ))
              }
            </Row>

            {
              ['away', 'home'].map(teamType => (
                <div styleName="stat-container" key={teamType}>
                  <Row
                    between='xs'
                    center='xs'
                    middle='xs'
                    styleName="stats"
                  >
                    <Col xs={5}>
                      <Row middle='xs'>
                        <p styleName="stat-position" className="label small">
                          {summary[teamType].leaders[selected].position}
                        </p>

                        <p className="semibold">
                          {summary[teamType].leaders[selected].first_name.slice(0, 1)}. {' '}
                          {summary[teamType].leaders[selected].last_name}
                        </p>

                        <img
                          src={summary[teamType].image}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginLeft: '10px'
                          }}
                        />
                      </Row>
                    </Col>

                    {
                      this.valueFactory(teamType).map((statValue, i) => (
                        <Col xs={2} key={`${teamType}-${statHeaders[selected][i]}`}>
                          <p className="semibold">{statValue}</p>
                        </Col>
                      ))
                    }
                  </Row>
                </div>
              ))
            }
          </div>
        </Card>
      </div>
    )
  }
}

GameLeaders.defaultProps = {
  summary: null,
}

GameLeaders.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLeaders)
