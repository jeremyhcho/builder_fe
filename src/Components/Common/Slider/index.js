import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// CSS
import './Slider.scss'

class Slider extends React.Component {
  componentDidMount() {
    // initializes fill width
    const { value, max, disabled } = this.props
    if (!disabled) this.offsetFill(value, max)
  }

  componentWillReceiveProps(newProps) {
    // changes fill width onChange
    if (newProps.value !== this.props.value) {
      const { value, max, disabled } = newProps
      if (!disabled) this.offsetFill(value, max)
    }
  }

  offsetFill = (currentValue, maxValue) => {
    let percentageValue = currentValue / maxValue
    const width = this.slider.offsetWidth
    let thumbPosition = percentageValue * width
    if (percentageValue > 0.95) {
      percentageValue -= 0.005
      thumbPosition = percentageValue * width
      this.fill.style.width = `${thumbPosition}px`
    } else if (percentageValue < 0.1) {
      percentageValue += 0.005
      thumbPosition = percentageValue * width
      this.fill.style.width = `${thumbPosition}px`
    } else {
      this.fill.style.width = `${thumbPosition}px`
    }
    console.log(`Percentage: ${percentageValue}`, `Current Position: ${thumbPosition}`)
  }

  render () {
    const { onChange, disabled, ...props } = this.props
    const sliderStyle = classNames('slider', {
      disabled
    })
    return (
      <div styleName="wrapper">
        <div styleName="fill" ref={ref => this.fill = ref} />
        <input
          type="range"
          ref={input => this.slider = input}
          styleName={sliderStyle}
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
  onChange: () => null,
}

Slider.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default Slider
