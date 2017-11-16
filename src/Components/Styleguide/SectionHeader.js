import React from 'react'
import PropTypes from 'prop-types'

const SectionHeader = ({ headerText }) => (
  <div style={{ textAlign: 'center' }}>
    <h1>{headerText.toUpperCase()}</h1>
  </div>
)

SectionHeader.propTypes = {
  headerText: PropTypes.string.isRequired
}

export default SectionHeader
