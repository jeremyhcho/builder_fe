import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import { StatsCard, Card, Spinner } from 'Components/Common'
import PredictionsInfo from './PredictionsInfo'

// Helpers
import { precisionRound } from 'Helpers'

const roundOne = precisionRound(1)

// CSS
import './Predictions.scss'

const Predictions = ({ prediction, summary, fetchingPrediction, fetchingModel }) => {
  const convertNumber = (num) => {
    if (num > 0) {
      return `+${roundOne(num)}`
    }

    return roundOne(num)
  }

  const getColor = (value) => {
    if (value > 0) return 'var(--green)'
    else if (value < 0) return 'var(--dark-red)'

    return null
  }

  if (!Object.keys(prediction).length || fetchingPrediction || fetchingModel) {
    return (
      <Card label="Prediction">
        <div
          style={{
            textAlign: 'center',
            padding: '65px',
          }}
        >
          <Spinner lg show />
        </div>
      </Card>
    )
  }

  const predictions = [
    {
      city: summary.away.city,
      name: summary.away.name,
      image: summary.away.image,
      predictedSpread: convertNumber(prediction.home_points - prediction.away_points) || 'EVEN',
      predictionValue: convertNumber(
        Number(prediction.vegas_away_line.spread) -
        Number(prediction.home_points - prediction.away_points)
      )
    },
    {
      city: summary.home.city,
      name: summary.home.name,
      image: summary.home.image,
      predictedSpread: convertNumber(prediction.away_points - prediction.home_points) || 'EVEN',
      predictionValue: convertNumber(
        Number(prediction.vegas_home_line.spread) -
        Number(prediction.away_points - prediction.home_points)
      )
    }
  ]

  const getPredictionValues = () => {
    return predictions.map(team => (
      [
        <div
          key={`${team.name}-team`}
          styleName="team"
        >
          <img
            src={team.image}
            styleName="logo"
          />

          <div>
            <p className="small label">{team.city}</p>
            <p className="semibold">{team.name}</p>
          </div>
        </div>,
        <p
          styleName="value"
          className="semibold"
          key={`${team.name}-predictedSpread`}
        >
          {team.predictedSpread}
        </p>,
        <p
          styleName="value"
          className="semibold"
          key={`${team.name}-predictionValue`}
          style={{ color: getColor(team.predictionValue) }}
        >
          {team.predictionValue}
        </p>
      ]
    ))
  }

  return (
    <StatsCard
      title="Prediction"
      subText={<PredictionsInfo />}
      labels={['TEAM', 'PREDICTED SPREAD', 'PREDICTION VALUE']}
      values={getPredictionValues()}
      uniqueKey='Prediction'
    />
  )
}

Predictions.defaultProps = {
  summary: {},
  prediction: {},
  fetchingPrediction: false,
  fetchingModel: false
}

Predictions.propTypes = {
  summary: PropTypes.object,
  prediction: PropTypes.object,
  fetchingPrediction: PropTypes.bool,
  fetchingModel: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  prediction: routines.nba.prediction,
  summary: routines.nba.summary,
  fetchingPrediction: routines.isLoading.FETCH_NBA_PREDICTION,
  fetchingModel: routines.isLoading.FETCH_NBA_MODEL
})

export default connect(
  mapStateToProps
)(Predictions)
