import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import { reduxForm, Field } from 'redux-form'

// Components
import { FieldInput, FieldToggle, Button } from 'Components/Common'

// CSS
import './CreateModel.scss'

// Helpers
import { presence, maxChar } from 'Helpers/Validators'
import modelValidate from './modelValidate'

const maxChar20 = maxChar(20)

const ModelInfo = ({ handleSubmit, handleBack }) => {
  return (
    <div styleName="model-info-container">
      <form onSubmit={handleSubmit}>
        <div styleName="model-info">
          <Row styleName="info-row">
            <Col xs={2}>
              <p style={{ padding: '30px 0' }}>Model Name</p>
            </Col>
            <Col>
              <Field
                name="Name"
                type="text"
                component={FieldInput}
                placeholder="Enter Model Name"
                validate={[presence, maxChar20]}
              />
            </Col>
          </Row>

          <Row styleName="info-row">
            <Col xs={2}>
              <p style={{ padding: '23px 0' }}>Status</p>
            </Col>
            <Col style={{ marginTop: '20px' }}>
              <Field
                name="status"
                component={FieldToggle}
              />
            </Col>
          </Row>
        </div>

        <div styleName="footer">
          <div styleName="buttons">
            <Button
              type="button"
              onClick={handleBack}
              flat
            >
              Back
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

ModelInfo.propTypes = {
  handleBack: PropTypes.func.isRequired,
  // handleNext: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'model',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: modelValidate
})(ModelInfo)
