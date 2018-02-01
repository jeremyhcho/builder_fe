import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

// Components
import ModelType from './ModelType'
import ModelInfo from './ModelInfo'
import Specs from './Specs'
import {
  // Button,
  Modal,
  // Spinner,
  Stepper
} from 'Components/Common'

// CSS
import './CreateModel.scss'

// Actions
import { createNBAModel } from 'Actions'

const stepList = ['Type', 'Details', 'Specs']

class CreateModel extends React.Component {
  state = {
    step: 0,
    modelType: 'standard',
    name: `Model_${Date.now().toString().slice(9)}`,
    specs: {
      field_goals_made: 10,
      three_points_made: 10,
      field_goals_pct: 10,
      offensive_rebounds: 10,
      assists: 10,
      turnovers: 10,
      fast_break_made: 10,
      second_chance_made: 10,
      offensive_points_per_possession: 10,
      defensive_points_per_possession: 10,
      offensive_rating: 10,
      defensive_rating: 10
    },
    status: 'ACTIVE'
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.isOpen && this.props.isOpen) {
      this.setState({
        name: `Model_${Date.now().toString().slice(9)}`,
        specs: {
          field_goals_made: 10,
          three_points_made: 10,
          field_goals_pct: 10,
          offensive_rebounds: 10,
          assists: 10,
          turnovers: 10,
          fast_break_made: 10,
          second_chance_made: 10,
          offensive_points_per_possession: 10,
          defensive_points_per_possession: 10,
          offensive_rating: 10,
          defensive_rating: 10
        },
        status: 'ACTIVE'
      })
    }
    if (!newProps.creatingModel && this.props.creatingModel) {
      this.props.toggle()
    }
  }

  createModel = () => {
    const name = this.state.name || `Model_${Date.now().toString().slice(9)}`
    this.props.createNBAModel({
      model: {
        name,
        specs: this.state.specs,
        status: this.state.status
      }
    })
  }

  changeStatus = () => {
    const { status } = this.state
    if (status === 'ACTIVE') {
      this.setState({ status: 'INACTIVE' })
    } else {
      this.setState({ status: 'ACTIVE' })
    }
  }

  changeSpecs = (e) => {
    const newSpecs = this.state.specs
    newSpecs[e.target.name] = e.target.value

    this.setState({ specs: newSpecs })
  }

  changeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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

  // renderFooter () {
  //   const { creatingModel, toggle } = this.props
  //   const { step } = this.state
  //   if (creatingModel) {
  //     return [
  //       <Button key="disabled" disabled>Back</Button>,
  //       <Button key="spinner" style={{ padding: '0 20.3px' }}>
  //         <Spinner xs show color="#fff" style={{ marginBottom: '3px' }} />
  //       </Button>
  //     ]
  //   }
  //   if (step === 0) {
  //     return [
  //       <Button key="close" onClick={toggle} flat>
  //         Close
  //       </Button>,
  //       <Button key="next" onClick={this.handleNext}>
  //         Next
  //       </Button>
  //     ]
  //   }
  //   if (step === stepList.length - 1) {
  //     return [
  //       [
  //         <Button onClick={this.handleBack} key="back" flat>
  //           Back
  //         </Button>,
  //         <Button onClick={this.createModel} key="create">
  //           Create
  //         </Button>
  //       ]
  //     ]
  //   }
  //   return [
  //     [
  //       <Button onClick={this.handleBack} key="back" flat>
  //         Back
  //       </Button>,
  //       <Button onClick={this.handleNext} key="next">
  //         Next
  //       </Button>
  //     ]
  //   ]
  // }

  renderStepDescription () {
    const stepDescriptions = [
      'Select the type of model you want to create',
      'Choose a name and the current status for this model',
      'Use the sliders to customize your model specs'
    ]

    return stepDescriptions[this.state.step]
  }

  renderModalView () {
    const { specs, status, name } = this.state
    const modelViews = [
      <ModelType
        handleNext={this.handleNext}
        handleClose={this.props.toggle}
      />,
      <ModelInfo
        name={name}
        changeInput={this.changeInput}
        changeStatus={this.changeStatus}
        status={status}
        handleNext={this.handleNext}
        handleBack={this.handleBack}
      />,
      <Specs
        handleBack={this.handleBack}
        createModel={this.createModel}
        specs={specs}
        changeSpecs={this.changeSpecs}
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
        height={350}
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
  creatingModel: routines.callingApi.CREATE_NBA_MODEL
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
      fast_break_made: 5,
      second_chance_made: 5,
      offensive_points_per_possession: 5,
      defensive_points_per_possession: 5,
      offensive_rating: 5,
      defensive_rating: 5
    }
  }
})(CreateModel))
