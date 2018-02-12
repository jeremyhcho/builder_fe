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

const ModelSummary = ({ predictions }) => {
  console.log('predictions: ', predictions)
  const getRecords = () => {
    const wins = predictions.filter(prediction => prediction.result === 'win').length
    const losses = predictions.filter(prediction => prediction.result === 'loss').length
    const ties = predictions.filter(prediction => prediction.result === 'tie').length
    const winrate = tenths((wins / (wins + losses)) * 100) || 0

    predictions.sort((a, b) => {
      return moment(a.match.date, 'DD MMM YYYY').diff(b.match.date, 'DD MMM YYYY')
    })

    const last5Games = groupBy(predictions.slice(-5), prediction => prediction.result)
    const last5Wins = last5Games.win ? `W${last5Games.win.length}` : null
    const last5Losses = last5Games.loss ? `L${last5Games.loss.length}` : null
    const last5Ties = last5Games.tie ? `T${last5Games.tie.length}` : null

    const last5 = [last5Wins, last5Losses, last5Ties].filter(result => result)
    console.log('last5Games: ', last5Games)
    console.log(last5Wins, last5Ties)
    console.log(last5)
    return [
      { label: 'Wins', value: wins },
      { label: 'Losses', value: losses },
      { label: 'Ties', value: ties },
      { label: 'Win Rate', value: `${winrate}%` },
      { label: 'Last 5', value: last5.length ? last5.join(' - ') : '-' }
    ]
  }

  return (
    <div styleName="model-summary">
      <p
        className="semibold"
        styleName="view-label"
      >
        Summary
      </p>

      <Row first='xs'>
        {
          getRecords().map(block => (
            <div styleName="summary-block" key={block.label}>
              <h4 className="semibold">
                {block.value}
              </h4>
              <p className="label">{block.label}</p>
            </div>
          ))
        }
      </Row>
    </div>
  )
}

ModelSummary.propTypes = {
  predictions: PropTypes.array.isRequired
}

export default ModelSummary
