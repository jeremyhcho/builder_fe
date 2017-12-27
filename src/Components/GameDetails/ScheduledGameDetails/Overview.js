import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

const Overview = ({ match }) => (
  <Row style={{ maxWidth: '1300px', width: '100%' }}>
    OVERVIEW
  </Row>
)

Overview.propTypes = {
  match: PropTypes.object.isRequired
}

export default Overview
