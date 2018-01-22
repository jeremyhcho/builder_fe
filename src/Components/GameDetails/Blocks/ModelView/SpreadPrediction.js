import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import regression from 'regression'
import { uniqBy } from 'lodash'

// Components
import {
  Card,
  ButtonGroup,
  Button,
  Spinner
} from 'Components/Common'

// CSS
import './ModelView.scss'

// Actions
import { fetchNBAAggregateSpreads } from 'Actions'

// Helpers
import { colorComparator } from 'Helpers'

class SpreadPrediction extends React.Component {
  state = {
    period: 'season',
    selected: 'away'
  }

  componentDidMount () {
    this.props.fetchNBAAggregateSpreads(this.props.summary.id)
  }

  fitData () {
    const { aggregateSpreads } = this.props
    const { selected, period } = this.state

    const groupedPredictions = aggregateSpreads[period][selected].predictions.map(prediction => (
      [prediction.win_percent || 0, prediction.spread]
    ))

    return uniqBy(
      regression.linear(groupedPredictions).points,
      data => data[0]
    ).sort((a, b) => a[0] - b[0])
  }

  determineColors () {
    const { summary } = this.props
    const homeColor = summary.home.colors.primary.slice(1)
    const awayColor = summary.away.colors.primary.slice(1)
    const secondaryAwayColor = summary.away.colors.secondary.slice(1)

    const ratio1 = colorComparator(homeColor, awayColor)
    const ratio2 = colorComparator(homeColor, secondaryAwayColor)

    const finalAwayColor = ratio1 > ratio2 ? secondaryAwayColor : awayColor

    return ({
      awayColor: `#${finalAwayColor}`,
      homeColor: `#${homeColor}`
    })
  }

  dataFactory () {
    const { aggregateSpreads } = this.props
    const { selected, period } = this.state

    const colors = this.determineColors()

    const datasets = [
      {
        type: 'line',
        label: 'Fit data points',
        fill: false,
        data: this.fitData().map(data => (
          { x: data[0], y: data[1] }
        )),
        lineTension: 0,
        cubicInterpolationMode: 'linear',
        spanGaps: true,
        pointRadius: 0,
        backgroundColor: 'transparent',
        borderColor: selected === 'away' ? colors.awayColor : colors.homeColor
      },
      {
        type: 'scatter',
        label: 'Data points',
        fill: false,
        data: aggregateSpreads[period][selected].predictions.map(prediction => (
          { x: prediction.win_percent || 0, y: prediction.spread }
        )),
        backgroundColor: 'transparent',
        borderColor: '#3C90DF',
        pointRadius: 1,
        pointBackgroundColor: '#3C90DF',
        lineTension: 0,
        showLine: false
      },
      {
        type: 'line',
        label: 'Vegas line spread',
        fill: false,
        data: uniqBy(
          aggregateSpreads[period][selected].predictions, prediction => prediction.win_percent)
          .sort((a, b) => a.win_percent - b.win_percent)
          .map(prediction => (
            {
              x: prediction.win_percent || 0,
              y: parseInt(aggregateSpreads[period][selected].vegas_spread, 10)
            }
          )),
        lineTension: 0,
        pointRadius: 0,
        backgroundColor: 'transparent',
        borderDash: [10, 5]
      }
    ]

    return { datasets }
  }

  render () {
    const { summary, fetchingAggregateSpreads, aggregateSpreads } = this.props

    const buttons = [
      { label: summary.away.name, key: 'away' },
      { label: summary.home.name, key: 'home' }
    ]

    const periodFilter = [
      { key: 'season', label: 'Season' },
      { key: 'last_5', label: 'Last 5' },
      { key: 'last_10', label: 'Last 10' }
    ]

    return (
      <Card
        label="Prediction Distribution (Spread)"
        styleName="spread-prediction"
        wrapperStyle={{
          padding: '25px'
        }}
      >
        <div styleName='button-headers'>
          <div>
            {
              periodFilter.map(period => {
                return period.key !== this.state.period ? (
                  <Button
                    flat
                    key={period.key}
                    onClick={() => this.setState({ period: period.key })}
                    style={{ marginLeft: '5px' }}
                  >
                    {period.label}
                  </Button>
                ) : (
                  <Button
                    disabled
                    style={{ cursor: 'default', marginLeft: '5px' }}
                    key={period.key}
                  >
                    {period.label}
                  </Button>
                )
              })
            }
          </div>

          <ButtonGroup
            buttons={buttons}
            onChange={(e, button) => this.setState({ selected: button.key })}
            defaultKey="away"
          />
        </div>
        {
          fetchingAggregateSpreads || !Object.keys(aggregateSpreads).length ? (
            <div style={{ textAlign: 'center', padding: '65px' }}>
              <Spinner lg show />
            </div>
          ) : (
            <Line
              data={this.dataFactory()}
              options={{
                linear: true,
                legend: {
                  display: false
                },
                animation: {
                  easing: 'linear',
                  duration: 500
                },
                scales: {
                  yAxes: [{
                    type: 'linear',
                    ticks: {
                      stepSize: 2,
                    },
                    gridLines: {
                      display: false
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Model Predictions'
                    }
                  }],
                  xAxes: [{
                    type: 'linear',
                    ticks: {
                      stacked: false,
                      maxTicksLimit: 3,
                    },
                    gridLines: {
                      display: false
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Model Win %'
                    }
                  }]
                }
              }}
            />
          )
        }
      </Card>
    )
  }
}

SpreadPrediction.defaultProps = {
  summary: {},
  aggregateSpreads: {}
}

SpreadPrediction.propTypes = {
  summary: PropTypes.object,
  aggregateSpreads: PropTypes.object,
  fetchingAggregateSpreads: PropTypes.bool.isRequired,
  fetchNBAAggregateSpreads: PropTypes.func.isRequired
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary,
  aggregateSpreads: nba.gameDetails.models.aggregateSpreads,
  fetchingAggregateSpreads: nba.gameDetails.models.fetchingAggregateSpreads
})

const mapDispatchToProps = {
  fetchNBAAggregateSpreads
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpreadPrediction)
