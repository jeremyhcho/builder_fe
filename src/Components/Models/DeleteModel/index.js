import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Modal, Button } from 'Components/Common'

// Actions
import { removeNBAModel } from 'Actions'

class DeleteModel extends React.Component {
  deleteModel = () => {
    const { model, removeNBAModel } = this.props
    removeNBAModel(model.id)
  }

  renderFooter () {
    const { deletingModel, toggle } = this.props

    if (deletingModel) {
      return [
        <Button
          disabled
          shouldFitContainer
          key="cancel"
        >
          Cancel
        </Button>,
        <Button
          danger
          shouldFitContainer
          loading
          key="delete"
        />
      ]
    }

    return [
      <Button
        flat
        shouldFitContainer
        onClick={toggle}
        key="cancel"
      >
        Cancel
      </Button>,
      <Button
        danger
        shouldFitContainer
        onClick={this.deleteModel}
        key="delete"
      >
        Delete model
      </Button>
    ]
  }

  render () {
    const { isOpen, toggle, model } = this.props

    return (
      <Modal
        header="Delete model"
        isOpen={isOpen}
        toggle={toggle}
        footer={this.renderFooter()}
        bodyStyle={{ width: '400px' }}
      >
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>
            Deleting {model.type} model: <span className="semibold">{model.name}</span>
          </p>
          <p className="small">Warning: A deleted model cannot be restored and all its predictions will be lost.</p>
        </div>
      </Modal>
    )
  }
}

DeleteModel.defaultProps = {
  deletingModel: false
}

DeleteModel.propTypes = {
  model: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  removeNBAModel: PropTypes.func.isRequired,
  deletingModel: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  deletingModel: routines.callingApi.DELETE_NBA_MODEL
})

const mapDispatchToProps = {
  removeNBAModel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModel)
