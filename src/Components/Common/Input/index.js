import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Input.scss'

const Input = ({ label, shouldFitContainer, ...props }) => {
  const inputClass = classNames('input', {
    shouldFitContainer
  })
  return (
    <div>
      <p>{label}</p>
      <input styleName={inputClass} {...props} />
    </div>
  )
}

Input.defaultProps = {
  label: '',
  shouldFitContainer: false
}

Input.propTypes = {
  label: PropTypes.string,
  shouldFitContainer: PropTypes.bool
}

export default Input
