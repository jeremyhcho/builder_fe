import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Components
import { Checkbox } from 'Components/Common'

// Icons
import BanIcon from 'Assets/Icons/ban.svg'

// Actions

// CSS
import './ViewModel.scss'

class ModelHistory extends React.Component {
  state = {
    checkAll: true,
    checkScheduled: false,
    checkClosed: false
  }

  handleChange = (field) => {
    return () => {
      const defaultState = {
        checkAll: false,
        checkScheduled: false,
        checkClosed: false
      }
      if (this.state[field]) {
        return null
      }

      return this.setState({
        ...defaultState,
        [field]: !this.state[field]
      })
    }
  }

  filteredPredictions () {
    const { checkScheduled, checkClosed } = this.state
    const { predictions } = this.props

    if (checkClosed) {
      return predictions.filter(prediction => prediction.match.status === 'CLOSED')
    }

    if (checkScheduled) {
      return predictions.filter(
        prediction => prediction.match.status === 'SCHEDULED' || prediction.match.status === 'INPROGRESS')
    }

    return predictions
  }

  render () {
    const filteredPredictions = this.filteredPredictions()
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
              filteredPredictions.length ? (
                this.filteredPredictions().map(prediction => (
                  <Row center='xs' styleName="prediction-values" key={prediction.id}>
                    <Col xs={3}>
                      <Row around='xs'>
                        <p className="label">
                          {moment(new Date(prediction.match.date)).format('MM/DD/YY')}
                        </p>
                        <p className="semibold">
                          {prediction.match.away.short_name} @ {prediction.match.home.short_name}
                        </p>
                      </Row>
                    </Col>

                    <Col xsOffset={1} xs={2}>
                      <p className="semibold">
                        {prediction.away_points}-{prediction.home_points}
                      </p>
                    </Col>

                    <Col xs={2}>
                      <p className="semibold">
                        {prediction.match.away.points}-{prediction.match.home.points}
                      </p>
                    </Col>

                    <Col xs={2}>
                      <p className="semibold">
                        Vegas Line Pick
                      </p>
                    </Col>

                    <Col xs={2}>
                      <p className="semibold">
                        {prediction.result || '-'}
                      </p>
                    </Col>
                  </Row>
                ))
              ) : (
                <div styleName="missing-predictions">
                  <BanIcon />
                  <h4 className="semibold label">
                    No predictions were found for this model
                  </h4>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

ModelHistory.propTypes = {
  predictions: PropTypes.array.isRequired
}

export default ModelHistory
