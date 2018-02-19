import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
// import classNames from 'classnames'

// Components
import { DocumentTitle } from 'Components/Common'
import ModelInfo from './ModelInfo'
import ModelSpecs from './ModelSpecs'

// Actions
import { createNBAModel, updateNBAModel } from 'Actions'

// CSS
import './CreateModel.scss'

// Helpers
import modelValidate from './modelValidate'
import specKeys from './specKeys'

class CreateModel extends React.Component {
  componentWillMount () {
    const { model, initialize, history } = this.props

    if (!history.location.state || history.location.state.from !== '/models') {
      history.push({ pathname: '/models' })
    }

    if (!model) {
      const specs = {}

      specKeys.forEach(spec => specs[spec] = 0)

      initialize({
        type: 'standard',
        status: true,
        specs
      })
    } else {
      initialize({
        type: model.type,
        status: model.status === 'ACTIVE',
        specs: model.specs,
        Name: model.name
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.submitFailed && !this.props.submitFailed) {
      this.modelContainer.scrollTop = 0
    }

    if (!newProps.creatingModel && this.props.creatingModel) {
      this.props.history.push({ pathname: '/models' })
    }

    if (!newProps.updatingModel && this.props.updatingModel) {
      this.props.history.push({ pathanme: '/models' })
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

  editModel = ({ Name, specs, status }) => {
    this.props.updateNBAModel(this.props.model.id, {
      model: {
        name: Name,
        specs,
        status: this.getModelStatus(status)
      }
    })
  }

  render () {
    const { model, handleSubmit } = this.props

    return (
      <DocumentTitle
        title='Quartz - NBA Models'
        header={model ? 'Edit Model' : 'Create Model'}
        backUrl='/models'
      >
        <div styleName="create-models" ref={ref => this.modelContainer = ref}>
          <form
            onSubmit={model ? handleSubmit(this.editModel) : handleSubmit(this.createModel)}
            style={{ display: 'inline-block' }}
          >
            <ModelInfo />
            <ModelSpecs />
          </form>
        </div>
      </DocumentTitle>
    )
  }
}

CreateModel.defaultProps = {
  creatingModel: false,
  updatingModel: false,
  model: null
}

CreateModel.propTypes = {
  history: PropTypes.object.isRequired,
  model: PropTypes.object,
  initialize: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  createNBAModel: PropTypes.func.isRequired,
  updateNBAModel: PropTypes.func.isRequired,
  creatingModel: PropTypes.bool,
  updatingModel: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
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
  destroyOnUnmount: true,
  validate: modelValidate
})(CreateModel))
