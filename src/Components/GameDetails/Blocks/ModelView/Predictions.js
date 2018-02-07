import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './ModelView.scss'

class Predictions extends React.Component {
  convertNumber (num) {
    if (num > 0) {
      return (
        <p className="semibold">
          +{num}
        </p>
      )
    }

    return (
      <p className="semibold">
        {num}
      </p>
    )
  }

  render () {
    const { summary, prediction } = this.props

    if (!Object.keys(prediction).length) {
      return <div />
    }

    return (
      <Card label="Prediction" styleName="prediction">
        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <p className="label small">TEAM</p>
          </Col>

          <Col xs={4}>
            <p className="label small">PREDICTED SPREAD</p>
          </Col>

          <Col xs={4}>
            <p className="label small">PREDICTIONVALUE</p>
          </Col>

          {/* <Col xs={4}>
            <p className="label small">TOTAL</p>
          </Col> */}
        </Row>

        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <Row start='xs'>
              <Col xsOffset={4}>
                <p className="small label">{summary.away.city}</p>
                <p className="semibold">{summary.away.name}</p>
              </Col>
            </Row>
          </Col>

          <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">
                {this.convertNumber(prediction.home_points - prediction.away_points)}
              </p>
            </div>
          </Col>

          <Col xs={4}>
            {
              this.convertNumber(
                Number(prediction.vegas_away_line.spread) -
                Number(prediction.home_points - prediction.away_points)
              )
            }
          </Col>

          {/* <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">O{prediction.home_points + prediction.away_points}</p>
              {
                this.convertNumber(
                  Number(prediction.home_points + prediction.away_points) -
                  Number(prediction.vegas_home_line.total)
                )
              }
            </div>
          </Col> */}
        </Row>

        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <Row start='xs'>
              <Col xsOffset={4}>
                <p className="small label">{summary.home.city}</p>
                <p className="semibold">{summary.home.name}</p>
              </Col>
            </Row>
          </Col>

          <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">
                {this.convertNumber(prediction.away_points - prediction.home_points)}
              </p>
            </div>
          </Col>

          <Col xs={4}>
            {
              this.convertNumber(
                Number(prediction.vegas_home_line.spread) -
                Number(prediction.away_points - prediction.home_points)
              )
            }
          </Col>

          {/* <Col xs={4}>
            <div styleName='spread'>
              <p className="semibold">U{prediction.home_points + prediction.away_points}</p>
              {
                this.convertNumber(
                  Number(prediction.vegas_home_line.total) -
                  Number(prediction.home_points + prediction.away_points)
                )
              }
            </div>
          </Col> */}
        </Row>
      </Card>
    )
  }
}

Predictions.defaultProps = {
  summary: {},
  prediction: {}
}

Predictions.propTypes = {
  summary: PropTypes.object,
  prediction: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  prediction: routines.nba.prediction,
  summary: routines.nba.summary
})

export default connect(
  mapStateToProps
)(Predictions)
