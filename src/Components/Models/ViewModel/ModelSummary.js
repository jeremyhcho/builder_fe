import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// CSS
import './ViewModel.scss'

// Helpers
import { precisionRound } from 'Helpers'

const tenths = precisionRound(1)

const ModelSummary = ({ model }) => {
  const getRecords = () => {
    const { wins, losses, ties, last5 } = model
    const winRate = wins + losses ? wins / (wins + losses) : 0

    return [
      { label: 'Wins', value: wins },
      { label: 'Losses', value: losses },
      { label: 'Ties', value: ties },
      { label: 'Win Rate', value: winRate ? `${tenths(winRate * 100)}%` : 'N/A' },
      { label: 'Last 5', value: last5 ? `${last5.wins}W - ${last5.losses}L` : 'N/A' }
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
  model: PropTypes.object.isRequired
}

export default ModelSummary
