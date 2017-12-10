import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// CSS
import './Slider.scss'

class Slider extends React.Component {
  state = {
    inputValue: this.props.value,
    value: this.props.value
  }

  componentDidMount() {
    // initializes fill width
    const { value, max, disabled } = this.props
    if (!disabled) this.offsetFill(value, max)
  }

  componentWillReceiveProps(newProps) {
    // changes fill width onChange
    if (newProps.value !== this.props.value) {
      this.setState({ value: newProps.value }, () => {
        if (!this.props.disabled) this.offsetFill(this.state.value, newProps.max)
      })
    }
  }

  handleChange = (e) => {
    if (e.target.value < this.props.min || !e.target.value.length) {
      this.setState({ value: this.props.min }, () => {
        this.offsetFill(this.state.value, this.props.max)
      })
    } else if (e.target.value > this.props.max) {
      this.setState({ value: this.props.max }, () => {
        this.offsetFill(this.state.value, this.props.max)
      })
    } else {
      this.setState({ value: e.target.value }, () => {
        this.offsetFill(this.state.value, this.props.max)
      })
    }
  }

  handleSubmit = (e) => {
    if (e.keyCode === 13) {
      this.handleBlur()
    }
  }

  handleBlur = () => {
    this.setState({
      value: Number(this.state.value).toFixed(0)
    })
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
  }

  render () {
    const { showInputControl, onChange, disabled, value, ...props } = this.props
    const sliderStyle = classNames('slider', {
      disabled
    })
    return (
      <div>
        <div styleName="slider-wrapper">
          <div styleName="fill" ref={ref => this.fill = ref} />
          <input
            type="range"
            value={this.state.value}
            ref={input => this.slider = input}
            styleName={sliderStyle}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          {
            showInputControl &&
            <input
              type="number"
              value={this.state.value}
              styleName="control-input"
              onChange={this.handleChange}
              onKeyUp={this.handleSubmit}
              onBlur={this.handleBlur}
            />
          }
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  disabled: false,
  onChange: () => null,
  showInputControl: false
}

Slider.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  showInputControl: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default Slider
