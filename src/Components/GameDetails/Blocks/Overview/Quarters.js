import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'
import classNames from 'classnames'

// Components
import { Card, Button, Tooltip } from 'Components/Common'
import OverviewSpinner from './OverviewSpinner'

// CSS
import './Overview.scss'

// Actions
import { fetchNBAQuarters } from 'Actions'

// Helpers
import { nbaFlatStat, precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const quartersList = ['q1', 'q2', 'q3', 'q4']

class Quarters extends React.Component {
  state = {
    selected: 'q1'
  }

  componentDidMount() {
    this.props.fetchNBAQuarters(this.props.matchId)
  }

  convertStat (stat, value) {
    if (value === undefined || value === null) return '-'

    let roundedStat = tenths(value)
    if (stat.includes('pct')) roundedStat = `${roundedStat}%`

    return roundedStat
  }

  quarterStatsFactory () {
    const { quarters } = this.props
    const { selected } = this.state
    const quarter = quarters[selected]
    return Object.keys(quarter.away).map(stat => {
      return {
        statKey: nbaFlatStat(stat),
        value: {
          away: this.convertStat(stat, quarter.away[stat]),
          home: this.convertStat(stat, quarter.home[stat])
        }
      }
    })
  }

  selectQuarter = (e) => {
    this.setState({ selected: e.target.name })
  }

  render () {
    const { quarters, summary } = this.props
    const { selected } = this.state

    const awayTeamValue = classNames('stats-value first', {
      hovered: this.state.highlightedRow === 'away',
    })

    const homeTeamValue = classNames('stats-value first', {
      hovered: this.state.highlightedRow === 'home'
    })

    return (
      <div>
        {
          quarters && summary ? (
            <Card label="Quarterly Stats" wrapperStyle={{ padding: '25px' }}>
              <Row styleName="quarters-buttons">
                {
                  quartersList.map((quarter) => {
                    return quarter !== selected ? (
                      <Button
                        flat
                        key={quarter}
                        onClick={() => this.setState({ selected: quarter })}
                        style={{ marginLeft: '5px', width: '37.5px' }}
                      >
                        {quarter.toUpperCase()}
                      </Button>
                    ) : (
                      <Button
                        key={quarter}
                        disabled
                        style={{ cursor: 'default', marginLeft: '5px', width: '37.5px' }}
                      >
                        {quarter.toUpperCase()}
                      </Button>
                    )
                  })
                }
              </Row>

              <div styleName="stats-list-container">
                <div styleName="key-column teams">
                  <p styleName="stats-label" className="label semibold small">TEAM</p>
                  <p
                    styleName={awayTeamValue}
                    className="semibold"
                    onMouseOver={() => this.setState({ highlightedRow: 'away' })}
                    onMouseOut={() => this.setState({ highlightedRow: null })}
                  >
                    {summary.away.name}
                  </p>
                  <p
                    styleName={homeTeamValue}
                    className="semibold"
                    onMouseOver={() => this.setState({ highlightedRow: 'home' })}
                    onMouseOut={() => this.setState({ highlightedRow: null })}
                  >
                    {summary.home.name}
                  </p>
                </div>

                <div styleName="stats-list-container stats">
                  {
                    this.quarterStatsFactory('away').map((stats, index, list) => {
                      if (!stats.statKey.short) {
                        return null
                      }

                      const awayStatsStyle = classNames('stats-value', {
                        hovered: this.state.highlightedRow === 'away',
                        last: index === list.length - 1
                      })

                      const homeStatsStyle = classNames('stats-value', {
                        hovered: this.state.highlightedRow === 'home',
                        last: index === list.length - 1
                      })

                      return (
                        <div key={stats.statKey.short} styleName="key-column stats">
                          <div className="flex">
                            <p
                              data-tip-for={stats.statKey.short}
                              styleName="stats-label"
                              className="label semibold small"
                            >
                              {stats.statKey.short}
                            </p>
                            <Tooltip id={stats.statKey.short} pos="top">
                              {stats.statKey.full}
                            </Tooltip>
                          </div>

                          <p
                            styleName={awayStatsStyle}
                            onMouseOver={() => this.setState({ highlightedRow: 'away' })}
                            onMouseOut={() => this.setState({ highlightedRow: null })}
                          >
                            {stats.value.away}
                          </p>

                          <p
                            styleName={homeStatsStyle}
                            onMouseOver={() => this.setState({ highlightedRow: 'home' })}
                            onMouseOut={() => this.setState({ highlightedRow: null })}
                          >
                            {stats.value.home}
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Card>
          ) : (
            <OverviewSpinner label="Quarterly Stats" />
          )
        }
      </div>
    )
  }
}

Quarters.defaultProps = {
  quarters: null,
  summary: null
}

Quarters.propTypes = {
  quarters: PropTypes.object,
  summary: PropTypes.object,
  matchId: PropTypes.string.isRequired,
  fetchNBAQuarters: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  quarters: routines.nba.quarters,
  summary: routines.nba.summary
})

const mapDispatchToProps = {
  fetchNBAQuarters
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quarters)
