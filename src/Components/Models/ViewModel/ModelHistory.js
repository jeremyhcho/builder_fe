import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Checkbox } from 'Components/Common'

// Actions

// CSS
import './ViewModel.scss'

class ModelHistory extends React.Component {
  state = {
    checkAll: false
  }

  handleChange = (field) => {
    return () => this.setState({ [field]: !this.state[field] })
  }

  render () {
    return (
      <div styleName="model-history">
        <p
          className="semibold"
          styleName="view-label"
        >
          History
        </p>

        <div styleName="view-predictions">
          <Row center='xs' middle='xs' styleName="prediction-label">
            <Col xs={4}>
              <Checkbox
                style={{ margin: '5px 10px 5px 0' }}
                onChange={this.handleChange('checkAll')}
                checked={this.state.checkAll}
              >
                All
              </Checkbox>

              <Checkbox
                style={{ margin: '5px 10px 5px 0' }}
                onChange={this.handleChange('checkScheduled')}
                checked={this.state.checkScheduled}
              >
                Scheduled
              </Checkbox>

              <Checkbox
                style={{ margin: '5px 10px 5px 0' }}
                onChange={this.handleChange('checkClosed')}
                checked={this.state.checkClosed}
              >
                Closed
              </Checkbox>
            </Col>

            <Col xs={2}>
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
      </div>
    )
  }
}

export default connect()(ModelHistory)
