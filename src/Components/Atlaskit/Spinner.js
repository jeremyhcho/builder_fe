import React from 'react'
import PropTypes from 'prop-types'

// Components
import Spinner from '@atlaskit/spinner'

const CustomSpinner = ({ style, ...props }) => (
  <span style={style}>
    <Spinner {...props} />
  </span>
)

CustomSpinner.defaultProps = {
  style: {}
}

CustomSpinner.propTypes = {
  style: PropTypes.object
}

export default CustomSpinner
