import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { validateResetToken } from 'Actions'

// Components
import ResetForm from './ResetForm'

// CSS
import './Reset.scss'

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
    return (
      <div styleName="reset">
        <h2 className="semibold" style={{ marginBottom: '30px', textAlign: 'left' }}>
          Reset your password
        </h2>

        <ResetForm
          token={this.state.token}
          userId={this.state.userId}
        />
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
