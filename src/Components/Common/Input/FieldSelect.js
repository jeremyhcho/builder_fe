import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Select } from 'Components/Common'

// CSS
import './Input.scss'

const errorStyle = {
  color: '#FE4A49',
  fontSize: '0.9em',
  margin: '5px 0 5px 5px'
}

class FieldSelect extends React.Component {
  state = {
    selectedValue: this.props.input.value
  }

  handleChange = (e, option) => {
    this.setState({
      selectedValue: option.value
    }, () => {
      this.props.input.onChange(this.state.selectedValue)
    })
  }

  render () {
    const { input, label, style, options, meta: { touched, error }, ...props } = this.props
    return (
      <div>
        <div style={{ margin: '15px 0 0', ...style }}>
          <p style={{ margin: '0 0 5px 0' }}>{label}</p>
          <Select
            options={options}
            selectedVal={input.value}
            onChange={this.handleChange}
            {...props}
          />
          {touched && error && <p style={errorStyle}>{error}</p>}
        </div>
      </div>
    )
  }
}

FieldSelect.defaultProps = {
  style: {},
  label: ''
}

FieldSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
  options: PropTypes.array.isRequired,
  label: PropTypes.string
}

export default FieldSelect
