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
  const inputStyle = classNames('input', {
    shouldFitContainer,
    error,
    disabled
  })

  const iconStyle = classNames('icon', {
    noLabel: isLabelHidden
  })

  const wrapperStyle = classNames('wrapper', {
    shouldFitContainer
  })

  return (
    <div styleName={wrapperStyle}>
      {
        !isLabelHidden &&
        <p style={{ margin: '0 0 5px 0' }}>
          {label}
          {required && !error && <span styleName="fa-required"><i className="fa fa-asterisk" aria-hidden="true" /></span>}
        </p>
      }
      {
        error &&
        <span styleName={iconStyle}>
          <i
            className="fa fa-exclamation-triangle"
            aria-hidden="true"
          />
        </span>
      }
      <input
        styleName={inputStyle}
        disabled={disabled}
        {...props}
      />
    </div>
  )
}

Input.defaultProps = {
  label: '',
  error: '',
  disabled: false,
  shouldFitContainer: false,
  isLabelHidden: false,
  required: false,
}

Input.propTypes = {
  label: PropTypes.string,
  shouldFitContainer: PropTypes.bool,
  error: PropTypes.string,
  isLabelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}

export default Input
