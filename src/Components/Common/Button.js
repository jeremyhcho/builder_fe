import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '@atlaskit/button'

const CustomButton = ({ style, ...props }) => (
  <div style={{ marginTop: '20px', ...style }}>
    <Button {...props} />
  </div>
)

CustomButton.defaultProps = {
  style: {}
}

CustomButton.propTypes = {
  style: PropTypes.object
}

export default CustomButton
