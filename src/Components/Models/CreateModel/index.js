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
      field_goals_made: 1,
      three_points_made: 1,
      field_goals_pct: 1,
      offensive_rebounds: 1,
      assists: 1,
      turnovers: 1,
      fast_break_made: 1,
      second_chance_made: 1,
      offensive_points_per_possession: 1,
      defensive_points_per_possession: 1,
      offensive_rating: 1,
      defensive_rating: 1
    }
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.isOpen && this.props.isOpen) {
      this.setState({
        name: `Model_${Date.now().toString().slice(9)}`,
        specs: {
          field_goals_made: 1,
          three_points_made: 1,
          field_goals_pct: 1,
          offensive_rebounds: 1,
          assists: 1,
          turnovers: 1,
          fast_break_made: 1,
          second_chance_made: 1,
          offensive_points_per_possession: 1,
          defensive_points_per_possession: 1,
          offensive_rating: 1,
          defensive_rating: 1
        }
      })
    }
    if (!newProps.models.creatingModel && this.props.models.creatingModel) {
      this.props.toggle()
    }
  }

  createModel = () => {
    this.props.createNBAModel({
      model: {
        name: this.state.name,
        specs: this.state.specs
      }
    })
  }

  changeSpecs = (e) => {
    const newSpecs = this.state.specs
    newSpecs[e.target.name] = e.target.value

    this.setState({ specs: newSpecs })
  }

  changeName = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { toggle, isOpen, models } = this.props
    let footer
    if (models.creatingModel) {
      footer = [<Spinner key="spinner" md show />]
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
        wrapperStyle={{ minWidth: '500px', minHeight: '500px' }}
      >
        <div styleName="modal-body">
          <ModelInfo name={this.state.name} changeName={this.changeName} />
          <Specs specs={this.state.specs} changeSpecs={this.changeSpecs} />
        </div>
      </Modal>
    )
  }
}

CreateModel.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  createNBAModel: PropTypes.func.isRequired,
  // createModel: PropTypes.bool.isRequired
  models: PropTypes.object.isRequired
}

const mapStateToProps = ({ nba }) => ({
  models: nba.models
})

const mapDispatchToProps = {
  createNBAModel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateModel)
