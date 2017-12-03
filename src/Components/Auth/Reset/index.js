import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { validateResetToken } from 'Actions'

// Components
import ResetForm from './ResetForm'

class Reset extends React.Component {
  state = {
    token: queryString.parse(this.props.location.search).token,
    userId: queryString.parse(this.props.location.search).id,
    password: '',
    passwordConfirmation: ''
  }

  componentWillMount () {
    if (!this.state.token || !this.props.validToken) {
      return this.props.history.push({ pathname: '/auth/login' })
    }

    return (
      this.props.validateResetToken({
        token: this.state.token,
        user_id: this.state.userId
      })
    )
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.validToken) {
      this.props.history.push({ pathname: '/' })
    }
  }

  onChange = (field) => {
    return (e) => this.setState({ [field]: e.target.value })
  }

  render () {
    const styles = {
      wrapperStyle: {
        width: '400px',
        minHeight: '565px',
        margin: '0 auto'
      },
      headerStyles: {
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        margin: '48px 0'
      }
    }

    return (
      <div style={styles.wrapperStyle}>
        <h1 style={styles.headerStyles}>
          Reset your password
        </h1>

        <ResetForm />
      </div>
    )
  }
}

Reset.propTypes = {
  location: PropTypes.object.isRequired,
  validToken: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  validateResetToken: PropTypes.func.isRequired
}

const mapStateToProps = () => ({
  validToken: true
})

const mapDispatchToProps = {
  validateResetToken
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Reset))
