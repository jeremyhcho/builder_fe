import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// Components
import CreateModel from 'Components/Models/CreateModel'

const EditModel = ({ history, ...props }) => (
  history.location.state ? (
    <CreateModel model={history.location.state.model} {...props} history={history} />
  ) : (
    <Redirect to={{ pathname: '/models' }} />
  )
)

EditModel.propTypes = {
  history: PropTypes.object.isRequired
}

export default EditModel
