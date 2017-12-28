import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Input } from 'Components/Common'

// CSS
import './CreateModel.scss'

const ModelInfo = ({ changeName, name }) => (
  <div styleName="modal-info">
    <Input
      label="Name"
      type="text"
      placeholder="Enter Model Name"
      value={name}
      name="name"
      onChange={changeName}
    />
  </div>
)

ModelInfo.propTypes = {
  name: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired
}

export default ModelInfo
