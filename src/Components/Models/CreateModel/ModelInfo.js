import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'

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
    <div styleName="model-info-container">
      <Row middle='xs' styleName="model-info">
        <Col xs={2}>
          <p className="semibold">Model Name</p>
        </Col>
        <Col>
          <Input
            type="text"
            placeholder="Enter Model Name"
            value={name}
            name="name"
            onChange={changeInput}
          />
        </Col>
      </Row>

      <Row middle='xs' styleName="model-info">
        <Col xs={2}>
          <p className="semibold">Status</p>
        </Col>
        <Col>
          <Toggle checked={checked} onChange={changeStatus} />
        </Col>
      </Row>
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
