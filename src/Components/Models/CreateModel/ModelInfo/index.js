import React from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { FieldInput, FieldToggle, ButtonGroup, Card } from 'Components/Common'

// CSS
import './ModelInfo.scss'

// Helpers
import { presence, maxChar } from 'Helpers/Validators'

const maxChar20 = maxChar(20)

class ModelInfo extends React.Component {
  render () {
    const modelTypeButtons = [
      { label: 'Standard', key: 'standard' },
      { label: 'Advanced', key: 'advanced', disabled: true }
    ]

    return (
      <Card label="Details" style={{ width: '800px' }}>
        <div styleName="model-details">
          <Row middle='xs' styleName="labels">
            <Col xs={4} style={{ textAlign: 'left' }}>
              <p className="small">MODEL NAME</p>
            </Col>

            <Col xsOffset={2} xs={4}>
              <p className="small">MODEL TYPE</p>
            </Col>

            <Col xs={2}>
              <p className="small">STATUS</p>
            </Col>
          </Row>

          <Row middle='xs' styleName="values">
            <Col xs={4} style={{ textAlign: 'left' }}>
              <Field
                component={FieldInput}
                name="Name"
                shouldFitContainer
                type="text"
                label="name"
                isLabelHidden
                style={{ margin: '0' }}
                placeholder="My First Model"
                validate={[presence, maxChar20]}
              />
            </Col>

            <Col xsOffset={2} xs={4}>
              <ButtonGroup
                buttons={modelTypeButtons}
                onChange={(button) => this.setState({ selected: button.key })}
                defaultKey='standard'
              />
            </Col>

            <Col xs={2}>
              <Field
                name="status"
                component={FieldToggle}
              />
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}

export default ModelInfo
