import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { reduxForm, Field, formValueSelector } from 'redux-form'

// Components
import { FieldSlider, Button } from 'Components/Common'

// CSS
import './CreateModel.scss'

// Helpers
import { nbaFlatStat } from 'Helpers'
import modelValidate from './modelValidate'

const specsKeys = [
  'field_goals_made',
  'three_points_made',
  'field_goals_pct',
  'offensive_rebounds',
  'assists',
  'turnovers',
  'offensive_points_per_possession',
  'defensive_points_per_possession',
  'offensive_rating',
  'defensive_rating'
]
const selector = formValueSelector('model')

class Specs extends React.Component {
  getSpecsDifference (specsTotal) {
    const requiredDifference = specsTotal - 50

    if (requiredDifference > 0) {
      return (
        <p style={{ color: 'var(--red)' }}>
          You need to drop {Math.abs(requiredDifference)} points to create your model
        </p>
      )
    } else if (requiredDifference < 0) {
      return (
        <p style={{ color: 'var(--red)' }}>
          You need to add {Math.abs(requiredDifference)} points to create your model
        </p>
      )
    }

    return null
  }

  renderButtons () {
    if (this.props.creatingModel || this.props.updatingModel) {
      return (
        [
          <Button disabled key="back">
            Back
          </Button>,
          <Button key="loading" type="button" loading />
        ]
      )
    }

    return (
      [
        <Button key="back" onClick={this.props.handleBack} flat>
          Back
        </Button>,
        <Button key="submit" type="submit">
          Submit
        </Button>
      ]
    )
  }

  render () {
    const { handleSubmit, specs } = this.props

    const specsTotal = Object.values(specs)
      .reduce((total, value) => parseInt(total, 10) + parseInt(value, 10))

    return (
      <div styleName="specs-container">
        <form onSubmit={handleSubmit}>
          <div styleName="specs">
            {
              specsKeys.map(stat => (
                <Row key={stat} styleName="slider-container" middle='xs'>
                  <Col xs={3}>
                    <p>{nbaFlatStat(stat).full}</p>
                  </Col>
                  <Col xs={9} style={{ paddingRight: '35px' }}>
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

          <div styleName="footer">
            <div styleName="buttons">
              {this.renderButtons()}
            </div>

            <div styleName="total-specs">
              <p>
                Your model has a spread of <span className="semibold">{specsTotal}</span> total points
              </p>
              {this.getSpecsDifference(specsTotal)}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Specs.defaultProps = {
  specs: {},
  creatingModel: false,
  updatingModel: false
}

Specs.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  specs: PropTypes.object,
  creatingModel: PropTypes.bool,
  updatingModel: PropTypes.bool
}

const mapStateToProps = ({ ...state, routines }) => ({
  specs: selector(state, 'specs'),
  creatingModel: routines.callingApi.CREATE_NBA_MODEL,
  updatingModel: routines.callingApi.UPDATE_NBA_MODEL
})

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'model',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: modelValidate
})(Specs))
