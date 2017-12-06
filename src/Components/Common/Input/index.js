import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Input.scss'

class Input extends React.Component {
  state = {
    dirty: false,
    error: null
  }

  componentWillReceiveProps() {
    console.log(this)
  }

  handleBlur = (e) => {
    if (e.target.value.length && !this.state.dirty) {
      this.setState({
        dirty: true
      })
    }
  }

  render () {
    const { label, validator, runValidations, ...inputProps } = this.props
    const errorMessage = runValidations(this.props.value)
    const inputClass = classNames('input', {
      error: this.state.dirty && errorMessage,
      // submit type input
      submit: inputProps.type === 'submit'
    })
    return (
      <div>
        <p>{label}</p>
        {
          this.state.dirty &&
          <p style={{ marginTop: '1px', color: '#D03D3C' }}>{errorMessage}</p>
        }
        <input
          styleName={inputClass}
          onBlur={this.handleBlur}
          {...inputProps}
        />
      </div>
    )
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  validator: PropTypes.array,
  label: PropTypes.string,
  runValidations: PropTypes.func
}

Input.defaultProps = {
  validator: [],
  label: '',
  runValidations: () => null
}

export default Input
