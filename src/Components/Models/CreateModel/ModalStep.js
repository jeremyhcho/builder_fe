import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './CreateModel.scss'

class ModalStep extends React.Component {
  renderSteps () {
    const { currentStep, steps, changeStep } = this.props
    return steps.map((step, i) => {
      const stepStyle = classNames('step', {
        selected: i === currentStep
      })

      const labelStyle = classNames('step-label', {
        selected: i === currentStep,
        last: i === steps.length - 1
      })

      return (
        <div
          className='flex'
          style={{ paddingRight: '48px' }}
          key={step}
        >
          <div
            styleName={stepStyle}
            onClick={i !== currentStep ? () => changeStep(i) : null}
          >
            <p className="small">{i + 1}</p>
          </div>
          <div styleName={labelStyle}>
            <p>{step}</p>
          </div>
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
    return (
      <div styleName="model-steps-container">
        <div styleName="model-steps">
          {this.renderSteps()}
        </div>
        <p className="small label">{this.renderStepHeader()}</p>
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
