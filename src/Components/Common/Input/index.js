import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Input.scss'

const Input = ({
  label,
  error,
  disabled,
  required,
  isLabelHidden,
  shouldFitContainer,
  ...props
}) => {
  const inputClass = classNames('input', {
    shouldFitContainer,
    error,
    disabled
  })

  return (
    <div styleName="wrapper">
      {!isLabelHidden && <p style={{ margin: '0 0 5px 0' }}>{label}</p>}
      {
        error &&
        <span styleName="fa-alert">
          <i
            className="fa fa-exclamation-triangle"
            aria-hidden="true"
          />
        </span>
      }
      {
        required && !error &&
        <span styleName="fa-required">
          <i

            className="fa fa-asterisk"
            aria-hidden="true"
          />
        </span>
      }
      <input
        styleName={inputClass}
        disabled={disabled}
        {...props}
      />
    </div>
  )
}

Input.defaultProps = {
  label: '',
  error: false,
  disabled: false,
  shouldFitContainer: false,
  isLabelHidden: false,
  required: false
}

Input.propTypes = {
  label: PropTypes.string,
  shouldFitContainer: PropTypes.bool,
  error: PropTypes.bool,
  isLabelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool
}

export default Input
