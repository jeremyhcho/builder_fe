import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Input, Toggle } from 'Components/Common'

// CSS
import './CreateModel.scss'

const ModelInfo = ({ changeInput, name, status, changeStatus }) => {
  let checked
  if (status === 'ACTIVE') {
    checked = true
  } else {
    checked = false
  }
  return (
    <div styleName="modal-info">
      <Input
        label="Model Name"
        type="text"
        placeholder="Enter Model Name"
        value={name}
        name="name"
        onChange={changeInput}
      />
      <div style={{ textAlign: 'center' }}>
        <p className="label" style={{ marginBottom: '-15px' }}>Status</p>
        <Toggle checked={checked} onChange={changeStatus} />
      </div>
    </div>
  )
}

ModelInfo.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired
}

export default ModelInfo
