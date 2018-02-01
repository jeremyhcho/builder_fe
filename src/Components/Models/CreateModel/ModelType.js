import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { reduxForm, formValueSelector } from 'redux-form'

// Components
import { Button } from 'Components/Common'

// Icons
import StandardIcon from 'Assets/Icons/models/align-bottom.svg'
import AdvancedIcon from 'Assets/Icons/models/chart-bars.svg'

// CSS
import './CreateModel.scss'

// Helpers
import validateModel from './validateModel'

const iconStyle = {
  width: '120px',
  height: '120px'
}

const selector = formValueSelector('model')

class ModelType extends React.Component {
  changeModelType = (type) => {
    this.props.change('type', type)
  }

  renderModelIcons () {
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

    return modelTypes.map(({ type, icon: ModelIcon }) => {
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
          <ModelIcon style={iconStyle} />
          <p className="semibold">{type[0].toUpperCase() + type.substr(1)} Model</p>
          {
            type === 'advanced' &&
            <p className="small label">This model is currently not available</p>
          }
        </div>
      )
    })
  }

  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.handleNext)}>
        <div styleName="model-type-container">
          {this.renderModelIcons()}

          <div styleName="buttons">
            <Button onClick={this.props.handleClose} flat>
              Close
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

ModelType.defaultProps = {
  type: ''
}

ModelType.propTypes = {
  type: PropTypes.string,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = ({ ...state }) => ({
  type: selector(state, 'type')
})

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'model',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateModel
})(ModelType))
