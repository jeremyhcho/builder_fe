import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import Summary from './Summary'
import Quarter from './Quarter'

// CSS
import './Overview.scss'

class Overview extends React.Component {
  render () {
    return (
      <div>
        <Row>
          <Col xs={5}>
            <Summary />
          </Col>
          <Col xs={7}>
            <Quarter />
          </Col>
        </Row>

        <Row>
          <Col xs={4}>
            Recent Games
          </Col>
          <Col xs={4}>
            Projected Lineup
          </Col>
          <Col xs={4}>
            Vegas Lines
          </Col>
        </Row>
      </div>
    )
  }
}

export default Overview
