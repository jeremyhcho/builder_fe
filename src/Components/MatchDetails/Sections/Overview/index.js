import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import Summary from './Summary'
import Quarters from './Quarters'
import GameLeaders from './GameLeaders'
import RecentGames from './RecentGames'
import StartingLineup from './StartingLineup'
import VegasLines from './VegasLines'
import Injuries from './Injuries'

// CSS
import './Overview.scss'

class Overview extends React.Component {
  render () {
    const idProp = this.props.match.params.id
    return (
      <Row style={{ maxWidth: '1300px', width: '100%' }}>
        <Col xs={12}>
          <Summary />
        </Col>

        <Col xs={12}>
          <Quarters idProp={idProp} />
        </Col>

        <Col xs={6}>
          <GameLeaders />
        </Col>

        <Col xs={6}>
          <VegasLines />
        </Col>

        <Col xs={7}>
          <StartingLineup idProp={idProp} />
        </Col>

        <Col xs={5}>
          <RecentGames idProp={idProp} />
        </Col>

        <Col xs={7}>
          <Injuries idProp={idProp} />
        </Col>
      </Row>
    )
  }
}

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
