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

// CSS
import './Overview.scss'

class Overview extends React.Component {
  render () {
    const idProp = this.props.match.params.id
    return (
      <Row>
        <Col xs={6}>
          <Summary idProp={idProp} />
        </Col>

        <Col xs={6}>
          <Quarters idProp={idProp} />
        </Col>

        <Col xs={6} lg={4}>
          <GameLeaders />
        </Col>

        <Col xs={6} lg={4}>
          <VegasLines />
        </Col>

        <Col xs={6} lg={4}>
          <StartingLineup idProp={idProp} />
        </Col>

        <Col xs={6} styleName='recent-games-col'>
          <RecentGames idProp={idProp} />
        </Col>
      </Row>
    )
  }
}

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
