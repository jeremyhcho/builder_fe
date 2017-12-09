import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// CSS
import './Slider.scss'

const Slider = ({ disabled, onChange, ...props }) => {
  const sliderStyle = classNames('slider', {
    disabled
  })

  return (
    <div styleName="wrapper">
      {
        disabled ? (
          <input
            styleName={sliderStyle}
            type="range"
            disabled
            {...props}
          />
        ) : (
          <input
            styleName={sliderStyle}
            type="range"
            onChange={onChange}
            {...props}
          />
        )
      }
    </div>
  )
}

Slider.defaultProps = {
  disabled: false,
  onChange: () => null
}

Slider.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

export default Slider
