import React from 'react'
import PropTypes from 'prop-types'

// Components
import Checkbox from '@atlaskit/checkbox'

const CustomCheckbox = ({ style, ...props }) => (
  <span style={style}>
    <Checkbox {...props} />
  </span>
)

CustomCheckbox.defaultProps = {
  style: {}
}

CustomCheckbox.propTypes = {
  style: PropTypes.object
}

export default CustomCheckbox
