import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'

// Components
import { Card, ButtonGroup, Button } from 'Components/Common'

// CSS
import './ModelView.scss'

// Actions
import { fetchNBAAggregateSpreads } from 'Actions'

const periodFilter = [
  { key: 'season', label: 'Season' },
  { key: 'last_5', label: 'Last 5' },
  { key: 'last_10', label: 'Last 10' }
]

class SpreadPrediction extends React.Component {
  state = {
    selectedPeriod: 'season',
    selected: 'away'
  }

  componentDidMount () {
    this.props.fetchNBAAggregateSpreads(this.props.summary.id, this.state.selectedPeriod)
  }

  dataFactory () {
    const { aggregateSpreads } = this.props
    const { selected } = this.state

    console.log(aggregateSpreads)

    aggregateSpreads[selected].predictions.sort((a, b) => (
      a.win_percent - b.win_percent
    ))

    const labels = []
    const data = []

    aggregateSpreads[selected].predictions
      .sort((a, b) => a.win_percent - b.win_percent)
      .forEach(prediction => {
        labels.push(prediction.win_percent || 0)
        data.push(prediction.spread)
      })

    const datasets = [{
      data,
      backgroundColor: 'transparent',
      borderColor: '#3C90DF',
      pointRadius: 0,
      lineTension: 0
    }]

    return { labels, datasets }
  }

  render () {
    const { summary, fetchingAggregateSpreads, aggregateSpreads } = this.props
    const { selectedPeriod } = this.state

    const buttons = [
      { label: summary.away.name, key: 'away' },
      { label: summary.home.name, key: 'home' }
    ]

    if (fetchingAggregateSpreads || !Object.keys(aggregateSpreads).length) {
      return <div />
    }

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
                return period.key !== selectedPeriod ? (
                  <Button
                    flat
                    key={period.key}
                    onClick={() => this.setState({ selectedPeriod: period.key })}
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
        <Line
          data={this.dataFactory()}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                // ticks: { display: false },
                gridLines: {
                  display: false
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Model Predictions'
                }
              }],
              xAxes: [{
                ticks: {
                  stacked: false
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
