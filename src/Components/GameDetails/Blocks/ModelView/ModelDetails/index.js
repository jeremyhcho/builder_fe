import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// CSS
import './ModelDetails.scss'

// Helpers
import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const ModelDetails = ({ model, prediction }) => {
  if (!Object.keys(model).length || !Object.keys(prediction).length) {
    return <div />
  }

  const getModelRecords = () => {
    const { wins, losses, streak, last5 } = model
    const winRate = wins + losses > 0 ? tenths(wins / (wins + losses) * 100) : 0

    return {
      wins,
      losses,
      winRate: winRate ? `${winRate}%` : 'N/A',
      streak: streak || 'N/A',
      last5: last5 || 'N/A'
    }
  }

  const getStreakColor = (streak) => {
    if (streak[0] === 'W') return 'var(--green)'
    else if (streak[0] === 'L') return 'var(--red)'

    return 'var(--font-color)'
  }

  const getResultColor = () => {
    if (prediction.result === 'win') return 'var(--green)'
    else if (prediction.result === 'loss') return 'var(--red)'

    return 'var(--font-color)'
  }

  const modelRecords = getModelRecords()

  return (
    <Row middle='xs' between='xs' styleName="model-stats">
      <div styleName="stats-card">
        <h4
          className="semibold"
          style={{ color: getResultColor() }}
        >
          {prediction.result.toUpperCase()}
        </h4>
        <p className="label">Result</p>
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
          {modelRecords.last5.wins}W - {modelRecords.last5.losses}L
        </h4>
        <p className="label">Last 5</p>
      </div>
    </Row>
  )
}

ModelDetails.defaultProps = {
  model: {},
  prediction: {}
}

ModelDetails.propTypes = {
  model: PropTypes.object,
  prediction: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  model: routines.nba.model,
  prediction: routines.nba.prediction
})

export default connect(
  mapStateToProps
)(ModelDetails)
