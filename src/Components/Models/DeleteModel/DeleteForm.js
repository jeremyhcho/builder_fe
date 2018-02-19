/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

// Components
import { FieldInput } from 'Components/Common'

// Helpers
import { presence, match } from 'Helpers/Validators'
import submit from './SubmitDelete'

// Actions
import { removeNBAModel } from 'Actions'

const errorStyle = {
  color: '#FE4A49',
  fontSize: '0.9em',
  margin: '5px 0 0 5px'
}

const DeleteForm = ({ model, handleSubmit, error }) => {
  const matchModelName = match(model.name)

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="Model"
        shouldFitContainer
        component={FieldInput}
        type="text"
        placeholder="Enter model name"
        autoComplete="off"
        validate={[presence, matchModelName]}
      />
      {
        error &&
        <p style={errorStyle}>{error}</p>
      }
    </form>
  )
}

DeleteForm.defaultProps = {
  error: ''
}

DeleteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  error: PropTypes.string,
  removeNBAModel: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  removeNBAModel
}

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({
  form: 'deleteModel',
  destroyOnUnmount: true,
  onSubmit: submit
})(DeleteForm))
