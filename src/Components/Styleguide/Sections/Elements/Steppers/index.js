import React from 'react'

// Components
import { Stepper, Button } from 'Components/Common'

class Steppers extends React.Component {
  state = {
    step: 0
  }

  handleNext = () => {
    this.setState({ step: this.state.step + 1 })
  }

  handlePrev = () => {
    this.setState({ step: this.state.step - 1 })
  }

  render () {
    return (
      <div>
        <Stepper
          steps={['Step 1', 'Step 2', 'Step 3']}
          activeStep={this.state.step}
        />
        <div className="flex">
          <Button flat onClick={this.handlePrev}>Back</Button>
          <Button onClick={this.handleNext}>Next</Button>
        </div>
      </div>
    )
  }
}

export default Steppers
