import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { groupBy } from 'lodash'
import { Row } from 'react-styled-flexboxgrid'

// CSS
import './ModelView.scss'

// Helpers
import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const ModelDetails = ({ selectedModel }) => {
  const getModelRecords = () => {
    const predictions = selectedModel.predictions.filter(prediction => prediction.result)
    const predictionResults = groupBy(predictions, prediction => {
      if (!prediction.result) return 'TBD'
      return prediction.result
    })

    const wins = predictionResults.win ? predictionResults.win.length : 0
    const losses = predictionResults.loss ? predictionResults.loss.length : 0
    const ties = predictionResults.tie ? predictionResults.tie.length : 0
    const winRate = wins + losses > 0 ? tenths((wins / (wins + losses)) * 100) : null

    let streak = 0
    const recentPrediction = predictions[predictions.length - 1]
    const lastGameResult = recentPrediction ? recentPrediction.result : null
    for (let i = predictions.length - 1; i >= 0; i--) {
      if (predictions[i].result === lastGameResult) streak++
      else break;
    }

    const last5Games = groupBy(predictions.slice(-5), prediction => prediction.result)
    const last5Wins = last5Games.win ? `W${last5Games.win.length}` : null
    const last5Losses = last5Games.loss ? `L${last5Games.loss.length}` : null
    const last5Ties = last5Games.tie ? `T${last5Games.tie.length}` : null

    const last5 = [last5Wins, last5Losses, last5Ties].filter(result => result)

    return {
      wins,
      losses,
      ties,
      winRate: winRate ? `${winRate}%` : 'N/A',
      streak: lastGameResult ? `${lastGameResult[0].toUpperCase()}${streak}` : 'N/A',
      last5: last5.length ? last5.join(' - ') : 'N/A'
    }
  }

  const getStreakColor = (streak) => {
    if (streak[0] === 'W') return 'var(--green)'
    else if (streak[0] === 'L') return 'var(--red)'

    return 'var(--font-color)'
  }

  if (!Object.keys(selectedModel).length) {
    return <div />
  }

  const modelRecords = getModelRecords()

  return (
    <Row middle='xs' between='xs' styleName="model-stats">
      <div styleName="stats-card">
        <h4 className="semibold">{selectedModel.type[0].toUpperCase() + selectedModel.type.substr(1)}</h4>
        <p className="label">Type</p>
      </div>

      <div styleName="stats-card">
        <h4 className="semibold">
          {modelRecords.wins}W - {modelRecords.losses}L
        </h4>
        <p className="label">Record</p>
      </div>

      <div styleName="stats-card">
        <h4 className="semibold">
          {modelRecords.winRate}
        </h4>
        <p className="label">Win %</p>
      </div>

      <div styleName="stats-card">
        <h4
          className="semibold"
          style={{ color: getStreakColor(modelRecords.streak) }}
        >
          {modelRecords.streak}
        </h4>
        <p className="label">Streak</p>
      </div>

      <div styleName="stats-card">
        <h4 className="semibold">
          {modelRecords.last5}
        </h4>
        <p className="label">Last 5</p>
      </div>
    </Row>
  )
}

ModelDetails.defaultProps = {
  selectedModel: {}
}

ModelDetails.propTypes = {
  selectedModel: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  selectedModel: routines.nba.model
})

export default connect(
  mapStateToProps
)(ModelDetails)
