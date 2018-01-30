import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import ModalStep from './ModalStep'
import ModelType from './ModelType'
import ModelInfo from './ModelInfo'
import Specs from './Specs'
import { Button, Modal, Spinner } from 'Components/Common'

// CSS
import './CreateModel.scss'

// Actions
import { createNBAModel } from 'Actions'

const stepList = ['Model type', 'Model information', 'Model specs']

class CreateModel extends React.Component {
  state = {
    modelType: 'basic',
    step: 0,
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


  // model view change handlers
  handleNext = () => {
    this.setState({ step: this.state.step + 1 })
  }

  handleBack = () => {
    this.setState({ step: this.state.step - 1 })
  }

  changeStep = (stepIndex) => {
    this.setState({ step: stepIndex })
  }

  renderFooter () {
    const { creatingModel, toggle } = this.props
    const { step } = this.state
    if (creatingModel) {
      return [
        <Button key="disabled" disabled>Back</Button>,
        <Button key="spinner" style={{ padding: '0 20.3px' }}>
          <Spinner xs show color="#fff" style={{ marginBottom: '3px' }} />
        </Button>
      ]
    }
    if (step === 0) {
      return [
        <Button
          key="close"
          onClick={toggle}
          flat
        >
          Close
        </Button>,
        <Button
          onClick={this.handleNext}
          key="next"
        >
          Next
        </Button>
      ]
    }
    if (step === stepList.length - 1) {
      return [
        [
          <Button
            onClick={this.handleBack}
            key="back"
            flat
          >
            Back
          </Button>,
          <Button
            onClick={this.createModel}
            key="create"
          >
            Create
          </Button>
        ]
      ]
    }
    return [
      [
        <Button
          onClick={this.handleBack}
          key="back"
          flat
        >
          Back
        </Button>,
        <Button
          onClick={this.handleNext}
          key="next"
        >
          Next
        </Button>
      ]
    ]
  }

  renderModalView () {
    const { specs, status, name, modelType } = this.state
    const modelViews = [
      <ModelType type={modelType} />,
      <ModelInfo
        name={name}
        changeInput={this.changeInput}
        changeStatus={this.changeStatus}
        status={status}
      />,
      <Specs specs={specs} changeSpecs={this.changeSpecs} />
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
        footer={this.renderFooter()}
        wrapperStyle={{ minWidth: '800px' }}
      >
        <div styleName="modal-body">
          <ModalStep
            changeStep={this.changeStep}
            currentStep={step}
            steps={stepList}
          />
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
)(CreateModel)
