import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Input } from 'Components/Common'

// CSS
import './EditModel.scss'

const ModelInfo = ({ changeInput, name }) => (
  <div styleName="modal-info">
    <Input
      label="Name"
      type="text"
      placeholder="Enter Model Name"
      value={name}
      name="name"
      onChange={changeInput}
    />
  </div>
)

ModelInfo.propTypes = {
  name: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired
}

export default ModelInfo
