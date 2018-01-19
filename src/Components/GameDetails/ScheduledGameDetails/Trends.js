import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import {
  Predictability,
  TrendStats
} from 'Components/GameDetails/Blocks'

class Trends extends React.Component {
  render () {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Predictability />
          </Col>

          <Col xs={6}>
            <TrendStats team="away" />
          </Col>

          <Col xs={6}>
            <TrendStats team="home" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Trends
