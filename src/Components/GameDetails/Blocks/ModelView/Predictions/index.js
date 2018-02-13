import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card, Spinner } from 'Components/Common'

// CSS
import './Predictions.scss'

const Predictions = ({ prediction, summary }) => {
  const convertNumber = (num) => {
    if (num > 0) {
      return `+${num}`
    }

    return num
  }

  const getColor = (value) => {
    if (value > 0) return 'var(--green)'
    else if (value < 0) return 'var(--red)'

    return null
  }

  if (!Object.keys(prediction).length) {
    return (
      <Card label="Prediction">
        <div
          style={{
            textAlign: 'center',
            padding: '35px',
          }}
        >
          <Spinner lg show />
        </div>
      </Card>
    )
  }

  const predictions = [
    {
      city: summary.away.city,
      name: summary.away.name,
      predictedSpread: convertNumber(prediction.home_points - prediction.away_points),
      predictionValue: convertNumber(
        Number(prediction.vegas_away_line.spread) -
        Number(prediction.home_points - prediction.away_points)
      )
    },
    {
      city: summary.home.city,
      name: summary.home.name,
      predictedSpread: convertNumber(prediction.away_points - prediction.home_points) || 'EVEN',
      predictionValue: convertNumber(
        Number(prediction.vegas_home_line.spread) -
        Number(prediction.away_points - prediction.home_points)
      )
    }
  ]

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
          <p className="label small">PREDICTION VALUE</p>
        </Col>
      </Row>

      {
        predictions.map(team => (
          <Row middle='xs' center='xs' styleName="prediction-section" key={team.name}>
            <Col xs={4}>
              <Row start='xs'>
                <Col xsOffset={4}>
                  <p className="small label">{team.city}</p>
                  <p className="semibold">{team.name}</p>
                </Col>
              </Row>
            </Col>

            <Col xs={4}>
              <p className="semibold">
                {team.predictedSpread}
              </p>
            </Col>

            <Col xs={4}>
              <p
                className="semibold"
                style={{ color: getColor(team.predictionValue) }}
              >
                {team.predictionValue}
              </p>
            </Col>
          </Row>
        ))
      }
    </Card>
  )
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