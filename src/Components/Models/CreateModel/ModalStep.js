import React from 'react'
import PropTypes from 'prop-types'

import './CreateModel.scss'

class ModalStep extends React.Component {
  renderSteps () {
    const { currentStep, steps, changeStep } = this.props
    return steps.map((step, i) => {
      if (currentStep === i) {
        return (
          <div
            key={step}
            styleName="step selected"
            className="semibold"
          >
            {i + 1}
          </div>
        )
      }
      return (
        <div
          styleName="step"
          key={step}
          className="semibold"
          onClick={() => changeStep(i)}
        >
          {i + 1}
        </div>
      )
    })
  }

  renderStepHeader () {
    switch (this.props.currentStep) {
      case 0:
        return 'Select the model type you wish to use'
      case 1:
        return 'Choose a name for your model and select its status'
      case 2:
        return 'Customize your model specs based on your preferences'
      default:
        return null
    }
  }

  render () {
    const { currentStep, steps } = this.props
    return (
      <div styleName="model-steps-container">
        <div styleName="model-steps">
          {this.renderSteps()}
        </div>
        <p className="label">
          Step {currentStep + 1} of {steps.length} - {steps[currentStep]}
        </p>
        <p className="semibold">{this.renderStepHeader()}</p>
      </div>
    )
  }
}

ModalStep.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  changeStep: PropTypes.func.isRequired
}

export default ModalStep
