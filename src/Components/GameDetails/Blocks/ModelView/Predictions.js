import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './ModelView.scss'

class Predictions extends React.Component {
  render () {
    const { summary } = this.props
    const teamNamesStyle = { textAlign: 'left', display: 'inline-block' }

    return (
      <Card label="Prediction" styleName="prediction">
        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <p className="semibold label">TEAM</p>
          </Col>

          <Col xs={4}>
            <p className="semibold label">SPREAD</p>
          </Col>

          <Col xs={4}>
            <p className="semibold label">TOTAL</p>
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <div style={teamNamesStyle}>
              <p className="semibold label">{summary.away.city}</p>
              <p className="semibold">{summary.away.name}</p>
            </div>
          </Col>

          <Col xs={4}>
            Spread
          </Col>

          <Col xs={4}>
            Total
          </Col>
        </Row>

        <Row middle='xs' center='xs' styleName="prediction-section">
          <Col xs={4}>
            <div style={teamNamesStyle}>
              <p className="semibold label">{summary.home.city}</p>
              <p className="semibold">{summary.home.name}</p>
            </div>
          </Col>

          <Col xs={4}>
            Spread
          </Col>

          <Col xs={4}>
            total_odds
          </Col>
        </Row>
      </Card>
    )
  }
}

Predictions.defaultProps = {
  summary: {}
}

Predictions.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ nba }) => ({
  summary: nba.gameDetails.overview.summary
})

export default connect(
  mapStateToProps
)(Predictions)
