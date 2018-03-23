import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, getFormSyncErrors } from 'redux-form'

// Components
import { DocumentTitle } from 'Components/Common'
import ModelInfo from './ModelInfo'
import ModelSpecs from './ModelSpecs'

// Actions
import { createNBAModel, updateNBAModel, openNBAIntroCongratulationsCue } from 'Actions'

// CSS
import './CreateModel.scss'

// Helpers
import specKeys from './specKeys'
import modelValidate from './modelValidate'

class CreateModel extends React.Component {
  componentWillMount () {
    const { model, initialize, history } = this.props

    if (!history.location.state || history.location.state.from !== '/models') {
      history.push({ pathname: '/models' })
    }

    if (!model) {
      const specs = {}

      specKeys.forEach(spec => specs[spec] = 1)

      initialize({
        type: 'standard',
        status: true,
        ...specs
      })
    } else {
      initialize({
        type: model.type,
        status: model.status === 'ACTIVE',
        name: model.name,
        ...model.specs
      })
    }
  }

  componentWillReceiveProps (newProps) {
    /* eslint-disable react/no-unused-prop-types */
    if (newProps.submitFailed && !this.props.submitFailed
      && newProps.submitErrors.name) {
      this.modelContainer.scrollTop = 0
    }

    if (!newProps.creatingModel && this.props.creatingModel) {
      if (newProps.limitError && !newProps.limitError.models) {
        this.props.history.push({ pathname: '/models' })

        if (newProps.modelSubmitCue) {
          this.props.openNBAIntroCongratulationsCue()
        }
      } else {
        this.props.history.push({
          pathname: '/models',
          state: { error: newProps.limitError.models.messages.status[0] }
        })
      }
    }

    if (!newProps.updatingModel && this.props.updatingModel) {
      this.props.history.push({ pathanme: '/models' })
    }
  }

  getModelStatus (status) {
    if (status) return 'ACTIVE'
    return 'INACTIVE'
  }

  createModel = ({ name, status, type, ...specs }) => {
    this.props.createNBAModel({
      name,
      status: this.getModelStatus(status),
      specs: {
        ...specs
      }
    })
  }

  editModel = ({ name, type, status, ...specs }) => {
    this.props.updateNBAModel(this.props.model.id, {
      model: {
        name,
        status: this.getModelStatus(status),
        specs: {
          ...specs
        }
      }
    })
  }

  render () {
    const { model, handleSubmit } = this.props

    return (
      <DocumentTitle
        title='Quze - NBA Models'
        header={model ? 'Edit Model' : 'Create Model'}
        backUrl='/models'
      >
        <div styleName="create-models" ref={ref => this.modelContainer = ref}>
          <form
            styleName="model-form"
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
  model: null,
  limitError: false
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
  submitErrors: PropTypes.object.isRequired,
  limitError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  modelSubmitCue: PropTypes.bool.isRequired,
  openNBAIntroCongratulationsCue: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines, cues, ...state }) => ({
  creatingModel: routines.isLoading.CREATE_NBA_MODEL,
  updatingModel: routines.isLoading.UPDATE_NBA_MODEL,
  limitError: routines.error.nba,
  modelSubmitCue: cues.intro.modelSubmit,
  submitErrors: getFormSyncErrors('model')(state)
})

const mapDispatchToProps = {
  createNBAModel,
  updateNBAModel,
  openNBAIntroCongratulationsCue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'model',
  validate: modelValidate
})(CreateModel))
