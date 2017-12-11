import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// CSS
import './Slider.scss'

class Slider extends React.Component {
  state = {
    // current value of slider
    value: this.props.value,
    // initialize inputControl width
    inputWidth: '40px'
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
      this.setState({
        value: this.props.min,
        inputWidth: this.findInputWidth(this.props.min)
      }, this.offsetFill(this.state.value, this.props.max))
    } else if (e.target.value > this.props.max) {
      this.setState({
        value: this.props.max,
        inputWidth: this.findInputWidth(this.props.max)
      }, this.offsetFill(this.state.value, this.props.max))
    } else {
      this.setState({
        value: Number(e.target.value).toFixed(0),
        inputWidth: this.findInputWidth(Number(e.target.value).toFixed(0))
      }, this.offsetFill(this.state.value, this.props.max))
    }
  }

  findInputWidth = (value) => {
    // Values outside of the range will read as number and return an undefined length
    if (value.toString().length > 2) return `${value.toString().length}em`
    return '40px'
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
            <div styleName="input-wrapper">
              <input
                type="number"
                value={this.state.value}
                styleName="control-input"
                style={{ width: this.state.inputWidth }}
                onChange={this.handleChange}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  disabled: false,
  onChange: () => null,
  showInputControl: false,
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
