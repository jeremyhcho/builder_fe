import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import Specs from './Specs'
import ModelInfo from './ModelInfo'
import { Button, Modal, Spinner } from 'Components/Common'

// CSS
import './CreateModel.scss'

// Actions
import { createNBAModel } from 'Actions'

class CreateModel extends React.Component {
  state = {
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

  render () {
    const { toggle, isOpen, creatingModel } = this.props
    const { specs, status, name } = this.state
    let footer
    if (creatingModel) {
      footer = [
        <Button key="disabled" disabled>Close</Button>,
        <Button key="spinner" style={{ padding: '0 20.3px' }}>
          <Spinner xs show color="#fff" style={{ marginBottom: '3px' }} />
        </Button>
      ]
    } else {
      footer = [
        <Button
          onClick={toggle}
          key="close"
          flat
        >
          Close
        </Button>,
        <Button
          onClick={this.createModel}
          key="create"
        >
          Create
        </Button>
      ]
    }
    return (
      <Modal
        header="Create Model"
        toggle={toggle}
        isOpen={isOpen}
        footer={footer}
        wrapperStyle={{ minWidth: '800px', minHeight: '500px' }}
      >
        <div styleName="modal-body">
          <ModelInfo
            name={name}
            changeInput={this.changeInput}
            changeStatus={this.changeStatus}
            status={status}
          />
          <Specs specs={specs} changeSpecs={this.changeSpecs} />
        </div>
      </Modal>
    )
  }
}

CreateModel.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  createNBAModel: PropTypes.func.isRequired,
  creatingModel: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ nba }) => ({
  creatingModel: nba.models.creatingModel
})

const mapDispatchToProps = {
  createNBAModel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateModel)
