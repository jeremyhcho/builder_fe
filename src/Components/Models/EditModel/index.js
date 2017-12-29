import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Modal, Button } from 'Components/Common'
import ModelInfo from './ModelInfo'
import Specs from './Specs'

// CSS
import './EditModel.scss'

// Actions
import { updateNBAModel } from 'Actions'

class EditModel extends React.Component {
  state = {
    name: this.props.model.name,
    specs: this.props.model.specs
  }

  changeSpecs = (e) => {
    const newSpecs = this.state.specs
    newSpecs[e.target.name] = e.target.value

    this.setState({ specs: newSpecs })
  }

  changeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  editModel = () => {
    this.props.updateNBAModel(this.props.model.id, {
      model: {
        name: this.state.name,
        specs: this.state.specs
      }
    })

    this.props.toggle()
  }

  render () {
    const { toggle, isOpen } = this.props
    const footer = [
      <Button onClick={toggle} key="close-edit" flat>Close</Button>,
      <Button onClick={this.editModel} key="edit">Edit</Button>
    ]
    return (
      <Modal
        header="Edit Model"
        toggle={toggle}
        isOpen={isOpen}
        footer={footer}
        wrapperStyle={{ minWidth: '500px', minHeight: '500px' }}
      >
        <div styleName="modal-body">
          <ModelInfo name={this.state.name} changeInput={this.changeInput} />
          <Specs specs={this.state.specs} changeSpecs={this.changeSpecs} />
        </div>
      </Modal>
    )
  }
}

EditModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  updateNBAModel: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateNBAModel
}

export default connect(
  null,
  mapDispatchToProps
)(EditModel)
