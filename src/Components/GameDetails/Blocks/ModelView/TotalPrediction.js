import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

// Actions
import { fetchNBAAggregateTotals } from 'Actions'

// Components
import { Card } from 'Components/Common'

// CSS
import './ModelView.scss'

// Selectors
import { makeFindGamePredictions } from 'Helpers/Selectors'

class TotalPrediction extends React.Component {
  componentDidMount () {
    this.props.fetchNBAAggregateTotals(this.props.summary.id)
  }

  dataFactory () {
    const { prediction, aggregateTotals } = this.props

    const labels = [
      `O${prediction.vegas_away_line.total}`,
      `U${prediction.vegas_away_line.total}`,
      'EVEN'
    ]

    const datasets = [{
      data: [
        aggregateTotals.over || 0,
        aggregateTotals.under || 0,
        aggregateTotals.ties || 0
      ],
      backgroundColor: ['#D03D3C', '#2E7BC4', '#0AA958'],
      borderColor: '#3B454D'
    }]

    return { labels, datasets }
  }

  render () {
    const { fetchingAggregateTotals, aggregateTotals } = this.props

    if (fetchingAggregateTotals || !aggregateTotals) {
      return (
        <Card label="Prediction Distribution (Total)" styleName="total-prediction">
          <Doughnut data={{}} />
        </Card>
      )
    }

    return (
      <Card
        label="Prediction Distribution (Total)"
        styleName="total-prediction"
        wrapperStyle={{ padding: '25px' }}
      >
        <div style={{ width: '100%', height: '200px' }}>
          <Doughnut
            data={this.dataFactory()}
            options={{
              maintainAspectRatio: false,
              legend: {
                onClick: () => null,
                position: 'right',
                labels: {
                  boxWidth: 14,
                  fontColor: '#48545D',
                  fontFamily: '"proxima-nova", "sans-serif"',
                  fontStyle: 'bold',
                  fontSize: 14,
                  padding: 25
                }
              },
              layout: {
                padding: {
                  right: 20
                }
              }
            }}
          />
        </div>
      </Card>
    )
  }
}

TotalPrediction.defaultProps = {
  summary: {},
  aggregateTotals: null,
  prediction: {},
  fetchingAggregateTotals: false
}

TotalPrediction.propTypes = {
  aggregateTotals: PropTypes.object,
  prediction: PropTypes.object,
  summary: PropTypes.object,
  fetchNBAAggregateTotals: PropTypes.func.isRequired,
  fetchingAggregateTotals: PropTypes.bool
}

const makeMapStateToProps = () => {
  const getPredictions = makeFindGamePredictions()
  const mapStateToProps = ({ routines }) => ({
    aggregateTotals: routines.nba.aggregateTotals,
    fetchingAggregateTotals: routines.callingApi.getNBAAggregateTotals,
    summary: routines.nba.summary,
    prediction: getPredictions(routines.nba.predictions, routines.nba.summary)
  })

  return mapStateToProps
}

const mapDispatchToProps = {
  fetchNBAAggregateTotals
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TotalPrediction)
