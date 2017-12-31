import React from 'react'
// import { Row } from 'react-styled-flexboxgrid'
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

// Components

// CSS

class Account extends React.Component {
  render () {
    return (
      <div />
    )
  }
}

export default reduxForm({
  form: 'accountSettings'
})(Account)
