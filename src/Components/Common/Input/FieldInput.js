import React from 'react'
import PropTypes from 'prop-types'

// Components
import Input from './'

// CSS
import './Input.scss'

const errorStyle = {
  color: '#FE4A49',
  fontSize: '0.8em',
  margin: '5px 0 5px 5px'
}

const FieldInput = ({ input, style, meta: { touched, error }, ...props }) => {
  return (
    <div>
      <Input
        style={{ ...style }}
        {...input}
        {...props}
      />
      {
        touched &&
        error && <p style={errorStyle}>{error}</p>
      }
    </div>
  )
}

FieldInput.defaultProps = {
  style: {}
}

FieldInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object
}

export default FieldInput
