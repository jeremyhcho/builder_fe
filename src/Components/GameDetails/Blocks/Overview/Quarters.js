import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'
import { uniqueId } from 'lodash'
// import classNames from 'classnames'

// Components
import { Card, Button } from 'Components/Common'
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

  highlightStat = (stat) => {
    this.setState({ highlightStat: stat })
  }

  quarterStatsFactory () {
    const { quarters } = this.props
    const { selected } = this.state
    const quarter = quarters[selected]
    return Object.keys(quarter.away).map(stat => {
      return {
        statKey: nbaFlatStat(stat),
        value: {
          away: tenths(quarter.away[stat]),
          home: tenths(quarter.home[stat])
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

    return (
      <div>
        {
          quarters && summary ? (
            <Card label="Quarterly Stats" wrapperStyle={{ padding: '25px' }}>
              <Row styleName="quarters-buttons">
                {
                  quartersList.map(quarter => {
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

              <div styleName="quarters-container">
                <div styleName="quarters-stat">
                  <p styleName="quarters-label" className="label semibold small">TEAM</p>
                  <p styleName="quarters-value" className="semibold">{summary.away.name}</p>
                  <p styleName="quarters-value" className="semibold">{summary.home.name}</p>
                </div>

                <div styleName="quarters-container stats">
                  {
                    this.quarterStatsFactory('away').map(stats => {
                      if (!stats.statKey) {
                        return null
                      }

                      return (
                        <div key={uniqueId('stat_')} styleName="quarters-stat">
                          <p
                            styleName="quarters-label"
                            className="label semibold small"
                            onMouseOver={() => this.highlightStat(stats.statKey)}
                          >
                            {stats.statKey}
                          </p>

                          <p
                            styleName="quarters-value"
                          >
                            {stats.value.away}
                          </p>

                          <p
                            styleName="quarters-value"
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
