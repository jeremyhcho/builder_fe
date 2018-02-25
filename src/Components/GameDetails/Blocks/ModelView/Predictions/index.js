import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { StatsCard, Card, Spinner } from 'Components/Common'
import PredictionsInfo from './PredictionsInfo'

// Icons
import CheckIcon from 'Assets/Icons/green-check.svg'

// Helpers
import { precisionRound } from 'Helpers'

const roundOne = precisionRound(2)

// CSS
import './Predictions.scss'

const Predictions = ({ prediction, summary, fetchingPrediction, fetchingModel }) => {
  const convertNumber = (num) => {
    const convertedNum = roundOne(num)

    if (convertedNum === 0) {
      return 'EVEN'
    }

    if (convertedNum > 0) {
      return `+${convertedNum}`
    }

    return convertedNum
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
      vegas: prediction.vegas_away_line.spread,
      predictedSpread: convertNumber(prediction.home_points - prediction.away_points),
      predictionValue: convertNumber(
        Number(prediction.vegas_away_line.spread) -
        Number(prediction.home_points - prediction.away_points)
      )
    },
    {
      city: summary.home.city,
      name: summary.home.name,
      image: summary.home.image,
      vegas: prediction.vegas_home_line.spread,
      predictedSpread: convertNumber(prediction.away_points - prediction.home_points),
      predictionValue: convertNumber(
        Number(prediction.vegas_home_line.spread) -
        Number(prediction.away_points - prediction.home_points)
      )
    }
  ]

  const getPredictionValues = () => {
    return predictions.map((team, i, teamPredictions) => {
      const awayTeam = teamPredictions[0]
      const homeTeam = teamPredictions[1]

      let winner
      if (awayTeam.predictedSpread < homeTeam.predictedSpread) {
        winner = awayTeam
      } else {
        winner = homeTeam
      }

      const spreadValue = classNames('spread-value', {
        winner: team.name === winner.name
      })

      return (
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
            styleName={spreadValue}
            className="semibold"
            key={`${team.name}-predictedSpread`}
          >
            {team.name === winner.name ? team.predictedSpread : ' '}
            {
              summary.status === 'CLOSED'
                && team.name === winner.name
                ? <CheckIcon style={{ position: 'absolute', right: '15px' }} /> : null
            }
          </p>,
          <p
            styleName="value"
            className="semibold"
            key={`${team.name}-vegas`}
          >
            {team.vegas}
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
      )
    })
  }

  return (
    <StatsCard
      title="Prediction"
      subText={<PredictionsInfo />}
      labels={['TEAM', 'PREDICTED SPREAD', 'VEGAS', 'PREDICTION VALUE']}
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
