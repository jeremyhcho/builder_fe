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
import { createNBAModel, updateNBAModel } from 'Actions'

// Helpers
import modelValidate from './modelValidate'

class CreateModel extends React.Component {
  state = {
    step: 0
  }

  componentWillMount () {
    const { model, initialize } = this.props

    if (model) {
      initialize({
        type: model.type,
        specs: model.specs,
        Name: model.name,
        status: model.status === 'ACTIVE'
      })
    } else {
      initialize({
        type: 'standard',
        status: true,
        specs: {
          field_goals_made: 0,
          three_points_made: 0,
          field_goals_pct: 0,
          offensive_rebounds: 0,
          assists: 0,
          turnovers: 0,
          offensive_points_per_possession: 0,
          defensive_points_per_possession: 0,
          offensive_rating: 0,
          defensive_rating: 0
        }
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.creatingModel && this.props.creatingModel) {
      this.props.toggle()
    }

    if (!newProps.updatingModel && this.props.updatingModel) {
      this.props.toggle()
    }
  }

  getStepList () {
    if (this.props.model) {
      return ['Details', 'Specs']
    }

    return ['Type', 'Details', 'Specs']
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

  editModel = ({ Name, specs, status }) => {
    this.props.updateNBAModel(this.props.model.id, {
      model: {
        name: Name,
        specs,
        status: this.getModelStatus(status)
      }
    })
  }

  handleNext = () => {
    this.setState({ step: this.state.step + 1 })
  }

  handleBack = () => {
    this.setState({ step: this.state.step - 1 })
  }

  renderStepDescription () {
    if (this.props.model) {
      const stepDescriptions = [
        'Choose a name and the current status for this model',
        'Use the sliders to customize your model specs'
      ]

      return stepDescriptions[this.state.step]
    }

    const stepDescriptions = [
      'Select the type of model you want to create',
      'Choose a name and the current status for this model',
      'Use the sliders to customize your model specs'
    ]

    return stepDescriptions[this.state.step]
  }

  renderModalView () {
    const { model } = this.props

    if (model) {
      const modelViews = [
        <ModelInfo
          onSubmit={this.handleNext}
          handleBack={this.handleBack}
        />,
        <Specs
          model={this.props.model}
          handleBack={this.handleBack}
          onSubmit={this.props.model ? this.editModel : this.createModel}
        />
      ]

      return modelViews[this.state.step]
    }

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
        model={this.props.model}
        handleBack={this.handleBack}
        onSubmit={this.props.model ? this.editModel : this.createModel}
      />
    ]

    return modelViews[this.state.step]
  }

  render () {
    const { toggle, isOpen, model } = this.props
    const { step } = this.state

    return (
      <Modal
        header={model ? 'Edit Model' : 'Create Model'}
        toggle={toggle}
        isOpen={isOpen}
        bodyStyle={{ height: '420px', paddingBottom: '60px', overflow: 'hidden' }}
        wrapperStyle={{ minWidth: '800px' }}
      >
        <div styleName="modal-body">
          <div style={{ textAlign: 'center' }}>
            <Stepper
              steps={this.getStepList()}
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
  creatingModel: false,
  updatingModel: false,
  model: null
}

CreateModel.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  createNBAModel: PropTypes.func.isRequired,
  updateNBAModel: PropTypes.func.isRequired,
  creatingModel: PropTypes.bool,
  updatingModel: PropTypes.bool,
  model: PropTypes.object,
  initialize: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  creatingModel: routines.isLoading.CREATE_NBA_MODEL,
  updatingModel: routines.isLoading.UPDATE_NBA_MODEL
})

const mapDispatchToProps = {
  createNBAModel,
  updateNBAModel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'model',
  validate: modelValidate
})(CreateModel))
