import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { formValueSelector, Field } from 'redux-form'

// Components & Icons
import { Card, FieldSlider, Button } from 'Components/Common'
import Error from 'Assets/Icons/error.svg'

// CSS
import './ModelSpecs.scss'

// Helpers
import { nbaFlatStat } from 'Helpers'
import specKeys from '../specKeys'

const selector = formValueSelector('model')

const ModelSpecs = ({ creatingModel, updatingModel, specs }) => {
  const getSpecsDifference = (specsTotal) => {
    const requiredDifference = specsTotal - 50

    if (requiredDifference > 0) {
      return (
        <Row middle='xs'>
          <Error height={16} />
          <p style={{ color: 'var(--red)', marginLeft: '-5px' }}>
            {Math.abs(requiredDifference)} points exceeded
          </p>
        </Row>
      )
    } else if (requiredDifference < 0) {
      return (
        <Row middle='xs'>
          <Error height={16} />
          <p style={{ marginLeft: '-5px' }}>{Math.abs(requiredDifference)} points available</p>
        </Row>
      )
    }

    return null
  }

  const renderSubmitButton = () => {
    if (updatingModel || creatingModel) {
      return <Button loading />
    }

    return <Button type="submit">Submit</Button>
  }

  const specsTotal = Object.values(specs)
    .reduce((total, value) => parseInt(total, 10) + parseInt(value, 10))

  return (
    <Card label="Specs" style={{ width: '800px' }}>
      <div styleName="model-specs">
        <Row styleName="labels" center='xs' middle='xs'>
          <Col xs={4} style={{ textAlign: 'left' }}>
            <p className="small">STAT</p>
          </Col>

          <Col xs={8}>
            <p className="small">WEIGHT VALUE</p>
          </Col>
        </Row>

        <div styleName="values">
          {
            specKeys.map(stat => (
              <Row styleName="slider-row" key={stat} middle='xs'>
                <Col xs={4} style={{ textAlign: 'left' }}>
                  <p className="small label">{nbaFlatStat(stat).full.toUpperCase()}</p>
                </Col>

                <Col xs={8}>
                  <Field
                    name={`specs.${stat}`}
                    component={FieldSlider}
                    min={0}
                    max={10}
                    showInputControl
                  />
                </Col>
              </Row>
            ))
          }
        </div>

        <Row middle='xs' styleName="footer" end='xs'>
          <Col>
            {getSpecsDifference(specsTotal)}
          </Col>

          <Col xs={2}>
            {renderSubmitButton()}
          </Col>
        </Row>
      </div>
    </Card>
  )
}

ModelSpecs.defaultProps = {
  specs: {},
  creatingModel: false,
  updatingModel: false
}

ModelSpecs.propTypes = {
  specs: PropTypes.object,
  creatingModel: PropTypes.bool,
  updatingModel: PropTypes.bool
}

const mapStateToProps = ({ ...state, routines }) => ({
  specs: selector(state, 'specs'),
  creatingModel: routines.isLoading.CREATE_NBA_MODEL,
  updatingModel: routines.isLoading.UPDATE_NBA_MODEL
})

export default connect(
  mapStateToProps
)(ModelSpecs)
