import React from 'react'
import PropTypes from 'prop-types'

// AtlasKit
import { FieldTextStateless } from '@atlaskit/field-text'

const FieldText = ({ style, ...props }) => (
  <div style={{ margin: '15px 0', ...style }}>
    <FieldTextStateless {...props} />
  </div>
)

FieldText.defaultProps = {
  styleName: '',
  style: {}
}

FieldText.propTypes = {
  styleName: PropTypes.string,
  style: PropTypes.object
}

export default FieldText
