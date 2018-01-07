import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { validateResetToken } from 'Actions'

// Components
import ResetForm from './ResetForm'

// Icons
import RefreshIcon from 'Assets/Icons/auth/refresh-01.svg'

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
    const iconStyle = {
      position: 'absolute',
      left: '-10px',
      top: '-10px',
      height: '40px',
      width: '40px'
    }

    return (
      <div styleName="reset">
        <div styleName="reset-header">
          <RefreshIcon style={iconStyle} />
          <h2 className="semibold" style={{ marginBottom: '25px' }}>
            Reset your password
          </h2>
        </div>

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
