import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './ViewModel.scss'

const ViewPredictions = () => {
  return (
    <div styleName="view-predictions">
      <Row center='xs' styleName="prediction-label">
        <Col xsOffset={4} xs={2}>
          <p className="label">Prediction</p>
        </Col>

        <Col xs={2}>
          <p className="label">Actual</p>
        </Col>

        <Col xs={2}>
          <p className="label">Pick</p>
        </Col>

        <Col xs={2}>
          <p className="label">Result</p>
        </Col>
      </Row>

      <div styleName="predictions">
        {
          [1, 2, 3, 4, 5, 6, 7].map(prediction => (
            <Row center='xs' styleName="prediction-values" key={prediction}>
              <Col xs={3}>
                <Row around='xs'>
                  <p className="label">12/18/17</p>
                  <p className="semibold">WAS @ MIN</p>
                </Row>
              </Col>

              <Col xsOffset={1} xs={2}>
                <p className="semibold">128-114</p>
              </Col>

              <Col xs={2}>
                <p className="semibold">110-110</p>
              </Col>

              <Col xs={2}>
                <p className="semibold">MIN -4 (+6.1)</p>
              </Col>

              <Col xs={2}>
                <p className="semibold">LOSS</p>
              </Col>
            </Row>
          ))
        }
      </div>
    </div>
  )
}

export default ViewPredictions
