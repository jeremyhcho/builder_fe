import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'

// CSS
import './Trends.scss'

class TrendStats extends React.Component {
  render () {
    const { summary } = this.props

    return (
      <Card label={`${summary.away.city} ${summary.away.name}`}>
        <Row middle='xs' center='xs' styleName="trends-section">
          <Col xs={4}>
            <p className="label semibold">TREND</p>
          </Col>

          <Col xs={4}>
            <p className="label semibold">VS. SPREAD</p>
            <p className="label small">(Win %)</p>
          </Col>

          <Col xs={4}>
            <p className="label semibold">AVG. PTS SCORED</p>
          </Col>
        </Row>
      </Card>
    )
  }
}

TrendStats.defaultProps = {
  summary: {}
}

TrendStats.propTypes = {
  summary: PropTypes.object
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary
})

export default connect(
  mapStateToProps
)(TrendStats)
