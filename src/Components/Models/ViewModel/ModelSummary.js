import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'
import moment from 'moment'
import { groupBy } from 'lodash'

// CSS
import './ViewModel.scss'

// Helpers
import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

class ModelSummary extends React.Component {
  getRecords () {
    const { predictions } = this.props

    const wins = predictions.filter(prediction => prediction.result === 'win').length
    const losses = predictions.filter(prediction => prediction.result === 'loss').length
    const winrate = tenths((wins / predictions.length) * 100)

    predictions.sort((a, b) => {
      return moment(a.match.date, 'DD MMM YYYY').diff(b.match.date, 'DD MMM YYYY')
    })

    const last5Games = groupBy(predictions.slice(-5), prediction => prediction.result)
    const last5Wins = last5Games.win ? `W${last5Games.win.length}` : null
    const last5Losses = last5Games.loss ? `L${last5Games.loss.length}` : null
    const last5Ties = last5Games.tie ? `T${last5Games.tie.length}` : null

    const last5 = [last5Wins, last5Losses, last5Ties].filter(result => result)

    return {
      wins,
      losses,
      winrate,
      last5: last5.length ? last5.join(' - ') : '-'
    }
  }

  render () {
    const predictionRecords = this.getRecords()
    return (
      <div styleName="model-summary">
        <p
          className="semibold"
          styleName="view-label"
        >
          Summary
        </p>

        <Row first='xs'>
          <div styleName="summary-block">
            <h4 className="semibold">
              {predictionRecords.wins}
            </h4>
            <p className="label">Wins</p>
          </div>

          <div styleName="summary-block">
            <h4 className="semibold">
              {predictionRecords.losses}
            </h4>
            <p className="label">Losses</p>
          </div>

          <div styleName="summary-block">
            <h4 className="semibold">
              {predictionRecords.winrate}%
            </h4>
            <p className="label">Win Rate</p>
          </div>

          <div styleName="summary-block">
            <h4 className="semibold">
              {predictionRecords.last5}
            </h4>
            <p className="label">Last 5</p>
          </div>
        </Row>
      </div>
    )
  }
}

ModelSummary.propTypes = {
  predictions: PropTypes.array.isRequired
}

export default ModelSummary
