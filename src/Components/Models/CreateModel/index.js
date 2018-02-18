import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Row, Col } from 'react-styled-flexboxgrid'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import classNames from 'classnames'

// Components
import { DocumentTitle, FieldInput, FieldToggle } from 'Components/Common'

// Icons
import StandardIcon from 'Assets/Icons/models/align-bottom.svg'
import AdvancedIcon from 'Assets/Icons/models/chart-bars.svg'

// CSS
import './CreateModel.scss'

// Helpers
import { presence, maxChar } from 'Helpers/Validators'
import modelValidate from './modelValidate'

const selector = formValueSelector('model')
const maxChar20 = maxChar(20)

class CreateModel extends React.Component {
  componentWillMount () {
    const { model, initialize } = this.props

    if (model) {
      initialize({
        type: model.type,
        specs: model.specs,
        Name: model.name,
        status: model.status === 'ACTIVE'
      })
    } else {
      initialize({
        type: 'standard',
        status: true,
        specs: {
          field_goals_made: 0,
          three_points_made: 0,
          field_goals_pct: 0,
          offensive_rebounds: 0,
          assists: 0,
          turnovers: 0,
          offensive_points_per_possession: 0,
          defensive_points_per_possession: 0,
          offensive_rating: 0,
          defensive_rating: 0
        }
      })
    }
  }

  changeModelType = (type) => {
    this.props.change('type', type)
  }

  render () {
    const modelTypes = [
      {
        type: 'standard',
        icon: StandardIcon
      },
      {
        type: 'advanced',
        icon: AdvancedIcon
      }
    ]

    return (
      <DocumentTitle
        title='Quartz - NBA Models'
        header='Create Model'
        backUrl='/models'
      >
        <div styleName="create-models">
          <form>
            <Field
              component={FieldInput}
              name="Name"
              type="text"
              placeholder="Enter Model Name"
              validate={[presence, maxChar20]}
            />

            <Field
              name="status"
              component={FieldToggle}
            />

            <div>
              {
                modelTypes.map(({ type, icon: ModelIcon }) => {
                  const modelTypeStyle = classNames('model-type-card', {
                    selected: type === this.props.type,
                    disabled: type === 'advanced'
                  })

                  return (
                    <div
                      styleName={modelTypeStyle}
                      key={type}
                      onClick={type !== 'advanced' ? () => this.changeModelType(type) : null}
                    >
                      <ModelIcon height={120} width={120} />
                      <p className="semibold">{type[0].toUpperCase() + type.substr(1)} Model</p>
                      {
                        type === 'advanced' &&
                        <p className="small label">This model is currently not available</p>
                      }
                    </div>
                  )
                })
              }
            </div>
          </form>
        </div>
      </DocumentTitle>
    )
  }
}

CreateModel.defaultProps = {
  type: ''
}

CreateModel.defaultProps = {
  model: {}
}

CreateModel.propTypes = {
  type: PropTypes.string,
  model: PropTypes.object,
  initialize: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
}

const mapStateToProps = ({ ...state }) => ({
  type: selector(state, 'type')
})

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'model',
  validate: modelValidate
})(CreateModel))
