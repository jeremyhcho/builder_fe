import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

// CSS
import './Matches.scss'

// Components
import Match from './Match'

const MatchList = ({ matches }) => (
  <Row styleName="matches-container">
    {matches.map(match => (
      <Col xs={12} key={match.id}>
        <Match key={match.id} match={match} />
      </Col>
    ))}
  </Row>
)

MatchList.propTypes = {
  matches: PropTypes.array.isRequired
}

export default MatchList
