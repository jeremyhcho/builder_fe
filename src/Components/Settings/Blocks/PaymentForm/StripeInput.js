import React from 'react'
import PropTypes from 'prop-types'

class StripeInput extends React.Component {
  state = {
    error: false
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ error: error.message })
    } else {
      this.setState({ error: false })
    }
  }

  render () {
    const { component: Component, label } = this.props

    const errorStyle = {
      color: '#FE4A49',
      fontSize: '0.9em',
      margin: '5px 0 0 5px'
    }

    const cardStyle = {
      base: {
        color: '#48545D',
        fontFamily: 'var(--font)',
        letterSpacing: '0.5px',
        fontSize: '14px',
        fontWeight: '300',
        '::placeholder': {
          color: '#9EB1BC',
        },
      },
      invalid: {
        color: '#FE4A49'
      }
    }

    return (
      <div style={{ marginTop: '15px' }}>
        <p style={{ marginBottom: '5px' }}>{label}</p>
        <Component
          onChange={this.handleChange}
          style={cardStyle}
        />
        {this.state.error && <p style={errorStyle}>{this.state.error}</p>}
      </div>
    )
  }
}

StripeInput.defaultProps = {
  label: ''
}

StripeInput.propTypes = {
  label: PropTypes.string,
  component: PropTypes.func.isRequired
}

export default StripeInput
