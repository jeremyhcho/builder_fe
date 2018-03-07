import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, formValueSelector, change } from 'redux-form'
import classNames from 'classnames'

// Components
import { FieldInput, FieldToggle } from 'Components/Common'

// Icons
import Water from 'Assets/Icons/sliders.svg'
import Fire from 'Assets/Icons/tools.svg'
import WhiteCheck from 'Assets/Icons/white-check.svg'

// CSS
import './ModelInfo.scss'

// Helpers
import { presence, maxChar } from 'Helpers/Validators'

const modelSelector = formValueSelector('model')
const changeModelType = (modelType) => change('model', 'type', modelType)

const maxChar20 = maxChar(20)

class ModelInfo extends React.Component {
  changeModelType = (modelType) => {
    return () => this.props.dispatch(changeModelType(modelType))
  }

  render () {
    const modelTypes = [
      { label: 'Standard', key: 'standard', icon: Water },
      { label: 'Advanced', key: 'advanced', icon: Fire, disabled: true }
    ]

    return (
      <section styleName="model-info">
        <div styleName="model-create-row">
          <div styleName="label">
            <p className="label">
              Name {' '}
              <span style={{ color: 'var(--red)' }}>*</span>
            </p>
          </div>

          <div styleName="input">
            <Field
              style={{ margin: '0' }}
              component={FieldInput}
              name="name"
              type="text"
              placeholder="My First Model"
              validate={[presence, maxChar20]}
            />
          </div>
        </div>

        <div styleName="model-create-row">
          <div styleName="label">
            <p className="label">Type</p>
          </div>

          <div styleName="input">
            {
              modelTypes.map(({ label, key, icon: Icon, disabled }) => {
                const selected = key === this.props.modelType
                const modelTypeCardStyle = classNames('model-type-card', {
                  selected: key === this.props.modelType,
                  disabled
                })

                return (
                  <div
                    styleName={modelTypeCardStyle}
                    key={key}
                    onClick={!disabled ? this.changeModelType(key) : null}
                  >
                    {
                      selected &&
                      <span>
                        <WhiteCheck />
                      </span>
                    }

                    <Icon height={65} width={65} style={{ opacity: '0.65' }} />
                    <p className="semibold">{label}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div styleName="model-create-row">
          <div styleName="label">
            <p className="label">Status</p>
          </div>

          <div styleName="input">
            <div
              className="small label"
              style={{ marginBottom: '25px', width: '40%' }}
            >
              An inactive model will still generate predictions for
              scheduled games but not affect its winrate.
              You can toggle the status of a model for an individual game in the respective
              "Game Details" section.
            </div>

            <Field
              name="status"
              component={FieldToggle}
            />
          </div>
        </div>
      </section>
    )
  }
}

ModelInfo.propTypes = {
  modelType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  modelType: modelSelector(state, 'type')
})

export default connect(
  mapStateToProps
)(ModelInfo)
