import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import regression from 'regression'
import { uniqBy } from 'lodash'
import outliers from 'outliers'

// Components
import {
  Card,
  ButtonGroup,
  Spinner
} from 'Components/Common'
import SpreadPredictionInfo from './SpreadPredictionInfo'

// CSS
import './SpreadPrediction.scss'

// Actions
import { fetchNBAAggregateSpreads } from 'Actions'

// Helpers
import { colorComparator } from 'Helpers'
import options from './options'

class SpreadPrediction extends React.Component {
  state = {
    selected: 'away'
  }

  componentDidMount () {
    this.props.fetchNBAAggregateSpreads(this.props.summary.id)
  }

  getRegressionPoint (plot) {
    const equation = this.regressionModel().equation

    const slope = equation[0]
    const yIntercept = equation[1]

    return (plot * slope) + yIntercept
  }

  regressionModel () {
    const { aggregateSpreads } = this.props
    const { selected } = this.state

    const groupedPredictions = aggregateSpreads[selected].predictions.map(prediction => (
      [prediction.win_percent || 0, prediction.spread]
    ))

    return regression.linear(groupedPredictions)
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
    const { selected } = this.state

    const colors = this.determineColors()

    const dataPoints = aggregateSpreads[selected].predictions.map(prediction => (
      { x: prediction.win_percent, y: prediction.spread }
    )).sort((a, b) => a.x - b.x)

    const filteredDataPoints = dataPoints.filter(outliers('x'))

    if (!filteredDataPoints.length) {
      return {}
    }

    const datasets = [
      {
        type: 'scatter',
        label: 'Model spread prediction',
        fill: false,
        data: filteredDataPoints,
        backgroundColor: '#3C90DF',
        borderColor: '#3C90DF',
        pointRadius: 1,
        pointHitRadius: 2,
        pointBackgroundColor: '#3C90DF',
        lineTension: 0,
        showLine: false
      },
      {
        type: 'line',
        label: 'Fit data line',
        fill: false,
        function: this.getRegressionPoint,
        data: [
          {
            x: filteredDataPoints[0].x,
            y: this.getRegressionPoint(filteredDataPoints[0].x)
          },
          {
            x: filteredDataPoints[filteredDataPoints.length - 1].x,
            y: this.getRegressionPoint(filteredDataPoints[filteredDataPoints.length - 1].x)
          }
        ],
        lineTension: 0,
        cubicInterpolationMode: 'linear',
        spanGaps: true,
        pointRadius: 0,
        pointHitRadius: 0,
        borderColor: selected === 'away' ? colors.awayColor : colors.homeColor,
        backgroundColor: selected === 'away' ? colors.awayColor : colors.homeColor
      },
      {
        type: 'line',
        label: 'Vegas line spread',
        fill: false,
        data: uniqBy(filteredDataPoints, points => points.x).map(points => (
          { x: points.x, y: aggregateSpreads[selected].vegas_spread }
        )),
        lineTension: 0,
        pointRadius: 0,
        pointHitRadius: 0,
        borderDash: [10, 5],
        backgroundColor: 'transparent'
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

    return (
      <Card
        label="Prediction Distribution (Spread)"
        subText={<SpreadPredictionInfo />}
        styleName="spread-prediction"
        wrapperStyle={{
          padding: '25px'
        }}
      >
        <div styleName='button-headers'>
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
              options={options}
            />
          )
        }
      </Card>
    )
  }
}

SpreadPrediction.defaultProps = {
  summary: {},
  aggregateSpreads: {},
  fetchingAggregateSpreads: false
}

SpreadPrediction.propTypes = {
  summary: PropTypes.object,
  aggregateSpreads: PropTypes.object,
  fetchingAggregateSpreads: PropTypes.bool,
  fetchNBAAggregateSpreads: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  aggregateSpreads: routines.nba.aggregateSpreads,
  fetchingAggregateSpreads: routines.isLoading.FETCH_NBA_AGGREGATE_SPREADS
})

const mapDispatchToProps = {
  fetchNBAAggregateSpreads
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpreadPrediction)
