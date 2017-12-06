import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Input.scss'

class FormGroup extends React.Component {
  render () {
    const { children } = this.props
    const submitClass = classNames('input submit')

    const newChildren = React.Children.map(children, (child) => {
      if (child.props.type === 'submit') {
        const { validator, runValidations, ...submitProps } = child.props
        return <input styleName={submitClass} {...submitProps} />
      }
      if (child.type.name === 'Input') {
        return React.cloneElement(child, {
          runValidations: (value) => {
            if (child.props.validator.length) {
              return child.props.validator.reduce((errorMessage, validatorFunction) => {
                if (errorMessage) return errorMessage
                /* eslint-disable no-param-reassign */
                errorMessage = validatorFunction(child.props.label, value)
                return errorMessage
              }, null)
            }
            return null
          }
        })
      }
      return child
    })

    return (
      <div>
        {newChildren}
      </div>
    )
  }
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FormGroup
