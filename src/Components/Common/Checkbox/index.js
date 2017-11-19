import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Checkbox.scss'

const Checkbox = ({
  children,
  onChange,
  value,
  disabled,
  style,
  checked,
  ...checkboxProps
}) => {
  const labelClass = classNames('checkbox-label', {
    disabled
  })

  const checkboxClass = classNames('checkbox', {
    disabled
  })

  const checkClass = classNames('check', {
    disabled
  })

  return (
    <label styleName={labelClass} style={style}>
      <input
        styleName={checkboxClass}
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...checkboxProps}
      />

      <span styleName={checkClass}>
        <i
          className='fa fa-check'
          styleName='fa-check'
          style={{
            display: 'inline-block',
            fontSize: '10px',
            position: 'absolute',
            left: '2px',
            top: '1px'
          }}
        />
      </span>

      <span style={{ marginLeft: '8px' }}>{children}</span>
    </label>
  )
}

Checkbox.defaultProps = {
  disabled: false,
  value: '',
  style: {},
  checked: false
}

Checkbox.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object
}

export default Checkbox
