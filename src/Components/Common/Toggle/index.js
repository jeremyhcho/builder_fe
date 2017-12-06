import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Toggle.scss'

const Toggle = ({ checked, onChange, disabled, ...inputProps }) => {
  const checkedClass = classNames('box', {
    checked,
    disabled,
    unchecked: !checked
  })

  return (
    <label styleName="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...inputProps}
      />
      <div
        styleName={checkedClass}
        data-background-checked="&#xf00c;"
        data-background-unchecked="&#xf00d;"
      />
    </label>
  )
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

Toggle.defaultProps = {
  checked: false,
  disabled: false,
}

export default Toggle
