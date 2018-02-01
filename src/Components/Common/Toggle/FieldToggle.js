import React from 'react'
import PropTypes from 'prop-types'

import Toggle from './Toggle'

class FieldToggle extends React.Component {
  render () {
    const { input } = this.props

    return (
      <Toggle checked={input.value} onChange={input.onChange} />
    )
  }
}

FieldToggle.propTypes = {
  input: PropTypes.object.isRequired
}

export default FieldToggle
