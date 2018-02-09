import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import classNames from 'classnames'

// Components
import { Modal, Button } from 'Components/Common'
import DeleteForm from './DeleteForm'

// Icons
import ErrorIcon from 'Assets/Icons/error.svg'

// CSS
import './DeleteModel.scss'

class DeleteModel extends React.Component {
  state = {
    renderDeleteField: false
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
          type="button"
          danger
          shouldFitContainer
          loading
          key="delete"
        />
      ]
    }

    if (this.state.renderDeleteField) {
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
          onClick={() => this.props.dispatch(submit('deleteModel'))}
          shouldFitContainer
          key="delete2"
        >
          Delete model
        </Button>
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
        type="button"
        shouldFitContainer
        onClick={() => this.setState({ renderDeleteField: true })}
        key="delete1"
      >
        Delete model
      </Button>
    ]
  }

  render () {
    const { isOpen, toggle, model } = this.props

    const formStyle = classNames('delete-form', {
      show: this.state.renderDeleteField
    })

    return (
      <Modal
        header="Delete Model"
        headerIcon={ErrorIcon}
        isOpen={isOpen}
        toggle={toggle}
        footer={this.renderFooter()}
        bodyStyle={{ width: '400px' }}
      >
        <div style={{ padding: '25px 25px 10px', lineHeight: '25px' }}>
          <p>
            Deleting model: <span className="semibold">{model.name}</span>
          </p>
          <p className="small">
            <span style={{ color: 'var(--red)' }}>Warning</span>
            : A deleted model cannot be restored and all its predictions will be lost.
          </p>

          <div styleName={formStyle}>
            <DeleteForm model={model} />
          </div>
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
  deletingModel: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  deletingModel: routines.callingApi.DELETE_NBA_MODEL
})

export default connect(
  mapStateToProps
)(DeleteModel)
