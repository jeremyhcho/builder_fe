import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// CSS
import './Slider.scss'

class Slider extends React.Component {
  render () {
    const { onChange, disabled, ...props } = this.props
    const sliderStyle = classNames('slider', {
      disabled
    })
    return (
      <div styleName="wrapper">
        <div styleName="fill" />
        <input
          ref={ref => this.slider = ref}
          styleName={sliderStyle}
          type="range"
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
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
