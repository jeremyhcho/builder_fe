import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

// Components
import ModelType from './ModelType'
import ModelInfo from './ModelInfo'
import Specs from './Specs'
import {
  Modal,
  Stepper
} from 'Components/Common'

// CSS
import './CreateModel.scss'

// Actions
import { createNBAModel } from 'Actions'

// Helpers
import modelValidate from './modelValidate'

const stepList = ['Type', 'Details', 'Specs']

class CreateModel extends React.Component {
  state = {
    step: 0,
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.creatingModel && this.props.creatingModel) {
      this.props.toggle()
    }
  }

  getModelStatus (status) {
    if (status) return 'ACTIVE'
    return 'INACTIVE'
  }

  createModel = ({ Name, specs, status }) => {
    this.props.createNBAModel({
      name: Name,
      specs,
      status: this.getModelStatus(status)
    })
  }

  handleNext = () => {
    this.setState({ step: this.state.step + 1 })
  }

  handleBack = () => {
    this.setState({ step: this.state.step - 1 })
  }

  changeStep = (stepIndex) => {
    this.setState({ step: stepIndex })
  }

  renderStepDescription () {
    const stepDescriptions = [
      'Select the type of model you want to create',
      'Choose a name and the current status for this model',
      'Use the sliders to customize your model specs'
    ]

    return stepDescriptions[this.state.step]
  }

  renderModalView () {
    const modelViews = [
      <ModelType
        onSubmit={this.handleNext}
        handleClose={this.props.toggle}
      />,
      <ModelInfo
        onSubmit={this.handleNext}
        handleBack={this.handleBack}
      />,
      <Specs
        handleBack={this.handleBack}
        onSubmit={this.createModel}
      />
    ]
    return modelViews[this.state.step]
  }

  render () {
    const { toggle, isOpen } = this.props
    const { step } = this.state

    return (
      <Modal
        header="Create Model"
        toggle={toggle}
        isOpen={isOpen}
        bodyStyle={{ height: '350px', marginBottom: '40px' }}
        wrapperStyle={{ minWidth: '800px' }}
      >
        <div styleName="modal-body">
          <div style={{ textAlign: 'center' }}>
            <Stepper
              steps={stepList}
              activeStep={step}
            />

            <p className="label" style={{ marginTop: '10px' }}>
              {this.renderStepDescription()}
            </p>
          </div>

          {this.renderModalView()}
        </div>
      </Modal>
    )
  }
}

CreateModel.defaultProps = {
  creatingModel: false
}

CreateModel.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  createNBAModel: PropTypes.func.isRequired,
  creatingModel: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  creatingModel: routines.callingApi.CREATE_NBA_MODEL,
})

const mapDispatchToProps = {
  createNBAModel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'model',
  initialValues: {
    type: 'standard',
    status: true,
    specs: {
      field_goals_made: 5,
      three_points_made: 5,
      field_goals_pct: 5,
      offensive_rebounds: 5,
      assists: 5,
      turnovers: 5,
      offensive_points_per_possession: 5,
      defensive_points_per_possession: 5,
      offensive_rating: 5,
      defensive_rating: 5
    }
  },
  validate: modelValidate
})(CreateModel))
