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
    const { initialize, history } = this.props

    const locationState = history.location.state

    if (!locationState) {
      return history.push({ pathname: '/models' })
    }

    if (locationState.from === 'create') {
      const specs = {}

      specKeys.forEach(spec => specs[spec] = 0)

      return initialize({
        type: 'standard',
        status: true,
        specs
      })
    } else if (locationState.from === 'edit') {
      const currentModel = locationState.model
      return initialize({
        type: currentModel.type,
        specs: currentModel.specs,
        Name: currentModel.name,
        status: currentModel.status === 'ACTIVE'
      })
    }

    return history.push({ pathname: '/models' })
  }

  componentWillReceiveProps (newProps) {
    if (newProps.submitFailed && !this.props.submitFailed) {
      this.modelContainer.scrollTop = 0
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
    this.props.updateNBAModel(this.props.history.location.state.model.id, {
      model: {
        name: Name,
        specs,
        status: this.getModelStatus(status)
      }
    })
  }

  render () {
    const { history } = this.props
    return (
      <DocumentTitle
        title='Quartz - NBA Models'
        header={history.location.state.model ? 'Edit Model' : 'Create Model'}
        backUrl='/models'
      >
        <div styleName="create-models" ref={ref => this.modelContainer = ref}>
          <form
            onSubmit={
              history.location.state.model ? this.props.handleSubmit(this.editModel)
                : this.props.handleSubmit(this.createModel)
            }
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

CreateModel.propTypes = {
  history: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  createNBAModel: PropTypes.func.isRequired,
  updateNBAModel: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createNBAModel,
  updateNBAModel
}

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({
  form: 'model',
  validate: modelValidate
})(CreateModel))
