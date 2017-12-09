import React from 'react'

// Component
import Slider from 'Components/Common/Slider'

// CSS
import './Sliders.scss'

class Sliders extends React.Component {
  state = {
    defaultSlider: 1,
    disabledSlider: 25
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { defaultSlider, disabledSlider } = this.state
    return (
      <div styleName="sliders">
        <div styleName="slider-container">
          <p style={{ margin: '8px 0' }}>DEFAULT</p>
          <Slider
            name="defaultSlider"
            value={defaultSlider}
            min={0}
            max={20}
            onChange={this.handleChange}
          />
        </div>
        <div styleName="slider-container">
          <p style={{ margin: '8px 0' }}>DISABLED</p>
          <Slider
            name="disabledSlider"
            value={disabledSlider}
            min={0}
            max={50}
            onChange={this.handleChange}
            disabled
          />
        </div>
      </div>
    )
  }
}

export default Sliders
