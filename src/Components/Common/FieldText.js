import React from 'react'
import PropTypes from 'prop-types'

// AtlasKit
import { FieldTextStateless } from '@atlaskit/field-text'

const errorStyle = {
  color: '#FE4A49',
  fontSize: '0.8em',
  margin: '5px 0 5px 5px'
}

const FieldText = ({ input, meta: { touched, error }, style, ...props }) => (
  <div>
    <div style={{ margin: '15px 0 0', ...style }}>
      <FieldTextStateless
        {...input}
        {...props}
      />
    </div>
    {
      touched &&
      error && <p style={errorStyle}>{error}</p>
    }
  </div>
)

FieldText.defaultProps = {
  styleName: '',
  style: {}
}

FieldText.propTypes = {
  styleName: PropTypes.string,
  style: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default FieldText
