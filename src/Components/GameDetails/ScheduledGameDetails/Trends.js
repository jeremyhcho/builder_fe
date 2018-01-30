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
      <Row style={{ maxWidth: '1300px', width: '100%' }}>
        <Col xs={12}>
          <Predictability />
        </Col>

        <Col xs={12}>
          <TrendStats />
        </Col>
      </Row>
    )
  }
}

export default Trends
