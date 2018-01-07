import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Stepper.scss'

class Stepper extends React.Component {
  state = {
    currentStep: this.props.activeStep
  }

  componentWillReceiveProps (newProps) {
    if (newProps.activeStep >= this.props.steps.length || newProps.activeStep < 0) {
      return
    }

    if (newProps.activeStep !== this.props.activeStep) {
      this.setState({ currentStep: newProps.activeStep })
    }
  }

  render () {
    const { currentStep } = this.state
    const { steps, isLabelHidden, wrapperStyle } = this.props
    return (
      <div styleName="stepper" style={wrapperStyle}>
        <div styleName="stepper-container">
          {
            steps.map((step, i) => {
              const stepStyle = classNames('step', {
                selected: i === currentStep
              })

              return (
                <div styleName={stepStyle} key={step}>
                  {i + 1}
                </div>
              )
            })
          }
        </div>
        {
          !isLabelHidden &&
          <p className="semibold">{steps[currentStep]}</p>
        }
      </div>
    )
  }
}

Stepper.defaultProps = {
  isLabelHidden: false,
  wrapperStyle: {}
}

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  isLabelHidden: PropTypes.bool,
  wrapperStyle: PropTypes.object
}

export default Stepper
