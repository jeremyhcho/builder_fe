import React from 'react'
import PropTypes from 'prop-types'

// Grid
import { Col } from 'react-grid-system'

const SectionHeader = ({ headerText }) => (
  <Col xs={6} offset={{ xs: 3 }} style={{ textAlign: 'center' }}>
    <h1>{headerText.toUpperCase()}</h1>
  </Col>
)

SectionHeader.propTypes = {
  headerText: PropTypes.string.isRequired
}

export default SectionHeader
