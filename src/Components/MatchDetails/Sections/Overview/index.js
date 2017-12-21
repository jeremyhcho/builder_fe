import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import Summary from './Summary'
import Quarter from './Quarter'
import GameLeaders from './GameLeaders'

// CSS
import './Overview.scss'

class Overview extends React.Component {
  render () {
    const idProp = this.props.match.params.id
    return (
      <div>
        <Row>
          <Col xs={12} lg={6}>
            <Summary idProp={idProp} />
            <GameLeaders />
          </Col>
          <Col xs={12} lg={6}>
            <Quarter idProp={idProp} />
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

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
