import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

// Components
import {
  Card,
  ButtonGroup,
  Button,
  // Spinner
} from 'Components/Common'

// CSS
import './Trends.scss'

// Actions
import { fetchNBAPredictability } from 'Actions'

// Helpers
import { colorComparator, createDoubleFillChart } from 'Helpers'

class Predictability extends React.Component {
  state = {
    period: 'season',
    selected: 'away'
  }

  componentDidMount () {
    this.props.fetchNBAPredictability(this.props.summary.id)
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
    const { predictability } = this.props
    const { selected } = this.state

    const data = predictability[selected].map(data => (
      { x: new Date(data.date), y: data.difference }
    )).sort((a, b) => {
      return moment(a.x).diff(moment(b.x))
    })

    // Create DoubleFillLine Chart
    createDoubleFillChart()

    const colors = this.determineColors()

    const datasets = [
      {
        type: 'DoubleFillLine',
        yAxisId: 'y-axis-0',
        label: 'Prediction difference',
        fill: true,
        data,
        borderColor: selected === 'away' ? colors.awayColor : colors.homeColor,
        pointBorderColor: selected === 'away' ? colors.awayColor : colors.homeColor,
        pointBackgroundColor: '#D1D8DB',
        pointRadius: 3,
        pointBorderWidth: 2,
        lineTension: 0.1,
      },
      {
        label: 'line break',
        fill: false,
        data: [
          { x: data[0].x, y: 0 },
          { x: data[data.length - 1].x, y: 0 }
        ],
        borderDash: [5],
        lineTension: 0,
        pointRadius: 0,
        borderColor: '#D1D8DB'
      }
    ]

    return { datasets }
  }

  render () {
    const { predictability, fetchingPredictability, summary } = this.props

    const buttons = [
      { label: summary.away.name, key: 'away' },
      { label: summary.home.name, key: 'home' }
    ]
    const periodFilter = [
      { key: 'season', label: 'Season' },
      { key: 'last_5', label: 'Last 5' },
      { key: 'last_10', label: 'Last 10' }
    ]

    if (fetchingPredictability || !Object.keys(predictability).length) {
      return <div />
    }

    const data = (canvas) => {
      return this.dataFactory(canvas)
    }

    return (
      <Card
        label="Predictability"
        styleName="predictability"
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
        <div>
          <Line
            data={data}
            height={300}
            options={{
              maintainAspectRatio: false,
              linear: true,
              legend: {
                display: false
              },
              tooltips: {
                callbacks: {
                  title: (tooltips, data) => {
                    console.log(moment.locale())
                    const tooltipIndex = tooltips[0].index
                    const dataset = data.datasets[0].data
                    return moment(dataset[tooltipIndex].x).format('ddd, MMM D, YYYY')
                  }
                }
              },
              scales: {
                yAxes: [{
                  ticks: {
                  },
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Outcome vs. Vegas Difference',
                    fontStyle: 'bold'
                  }
                }],
                xAxes: [{
                  type: 'time',
                  ticks: {
                    maxRotation: 60,
                    minRotation: 60
                  },
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: 'MMM DD'
                    }
                  },
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Time',
                    fontStyle: 'bold'
                  }
                }]
              }
            }}
          />
        </div>
      </Card>
    )
  }
}

Predictability.defaultProps = {
  summary: {},
  predictability: {},
  fetchingPredictability: false,
}

Predictability.propTypes = {
  summary: PropTypes.object,
  predictability: PropTypes.object,
  fetchingPredictability: PropTypes.bool,
  fetchNBAPredictability: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  fetchingPredictability: routines.callingApi.getNBAPredictability,
  predictability: routines.nba.predictability
})

const mapDispatchToProps = {
  fetchNBAPredictability
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Predictability)
