import React from 'react'
// import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// CSS
import './ViewModel.scss'

class ModelSummary extends React.Component {
  render () {
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
            <h4 className="semibold">20</h4>
            <p className="label">Wins</p>
          </div>

          <div styleName="summary-block">
            <h4 className="semibold">5</h4>
            <p className="label">Losses</p>
          </div>

          <div styleName="summary-block">
            <h4 className="semibold">60.5%</h4>
            <p className="label">Win Rate</p>
          </div>

          <div styleName="summary-block">
            <h4 className="semibold">4W - 1L</h4>
            <p className="label">Last 5</p>
          </div>
        </Row>
      </div>
    )
  }
}

export default ModelSummary
