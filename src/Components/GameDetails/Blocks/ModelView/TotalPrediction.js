import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

// Actions
import { fetchNBAAggregateTotals } from 'Actions'

// Components
import { Card, Spinner } from 'Components/Common'

// CSS
import './ModelView.scss'

// Helpers & Selectors
import { makeFindGamePredictions } from 'Helpers/Selectors'
import { precisionRound } from 'Helpers'

const roundHundredths = precisionRound(2)

class TotalPrediction extends React.Component {
  componentDidMount () {
    this.props.fetchNBAAggregateTotals(this.props.summary.id)
  }

  roundNumber (num) {
    return Number.parseFloat(num).toFixed(2)
  }

  dataFactory () {
    const { prediction, aggregateTotals } = this.props

    const labels = [
      `O${prediction.vegas_away_line.total}`,
      `U${prediction.vegas_away_line.total}`,
      'EVEN'
    ]

    const datasets = [{
      data: Object.keys(aggregateTotals).map(stat => (
        roundHundredths(aggregateTotals[stat])
      )),
      backgroundColor: ['#D03D3C', '#2E7BC4', '#0AA958'],
      borderColor: '#3B454D'
    }]

    return { labels, datasets }
  }

  render () {
    const { aggregateTotals } = this.props

    const doughnutOptions = {
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
          right: 30,
          left: 15
        }
      }
    }

    return (
      <Card
        label="Prediction Distribution (Total)"
        styleName="total-prediction"
        wrapperStyle={{ padding: '28px 20px' }}
      >
        {
          !Object.keys(aggregateTotals).length ? (
            <div style={{ textAlign: 'center', padding: '65px' }}>
              <Spinner lg show />
            </div>
          ) : (
            <Doughnut
              width={200}
              height={200}
              data={this.dataFactory()}
              options={doughnutOptions}
            />
          )
        }
      </Card>
    )
  }
}

TotalPrediction.defaultProps = {
  summary: {},
  aggregateTotals: {},
  prediction: null
}

TotalPrediction.propTypes = {
  aggregateTotals: PropTypes.object,
  prediction: PropTypes.object,
  summary: PropTypes.object,
  fetchNBAAggregateTotals: PropTypes.func.isRequired
}

const makeMapStateToProps = () => {
  const getPredictions = makeFindGamePredictions()
  const mapStateToProps = ({ routines }) => ({
    aggregateTotals: routines.nba.aggregateTotals,
    summary: routines.nba.summary,
    prediction: getPredictions(routines)
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
