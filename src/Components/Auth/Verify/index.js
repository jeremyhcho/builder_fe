import React from 'react'
import queryString from 'query-string'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { verifyUser } from 'Actions'

// CSS
import './Verify.scss'

// Assets
import SuccessIcon from 'Assets/Icons/auth/success.svg'
import ErrorIcon from 'Assets/Icons/auth/error.svg'

class Verify extends React.Component {
  state = {
    token: queryString.parse(this.props.location.search).token,
    userId: queryString.parse(this.props.location.search).id
  }

  componentDidMount () {
    const { token, userId } = this.state
    const { validToken, history } = this.props

    if (!token || !validToken) {
      return history.push({ pathname: '/auth/login' })
    }

    return (
      this.props.verifyUser({
        user_id: userId,
        token
      })
    )
  }

  componentWillReceiveProps () {
    if (this.props.user.is_verified) {
      history.push({ pathname: '/' })
    }
  }

  render () {
    if (this.props.validatingToken) {
      return <div />
    }

    if (!this.props.validToken) {
      return (
        <div styleName="verify">
          <ErrorIcon width={64} height={64} style={{ margin: '0 auto', display: 'block' }} />
          <h3 style={{ marginTop: '30px', textAlign: 'center' }}>
            Oops, this doesn't seem like the right verification link.
          </h3>

          <p className="small" style={{ textAlign: 'center', marginTop: '45px' }}>
            <Link to='/auth/login'>
              Redirect to log in
            </Link>
          </p>
        </div>
      )
    }

    return (
      <div styleName="verify">
        <SuccessIcon width={64} height={64} style={{ margin: '0 auto', display: 'block' }} />
        <h3 style={{ marginTop: '30px', textAlign: 'center' }}>
          Your account has been <br />successfully verified!
        </h3>

        <p className="small" style={{ textAlign: 'center', marginTop: '45px' }}>
          <Link to='/auth/login'>
            Redirect to log in
          </Link>
        </p>
      </div>
    )
  }
}

Verify.propTypes = {
  location: PropTypes.object.isRequired,
  validToken: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  verifyUser: PropTypes.func.isRequired,
  validatingToken: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  validToken: auth.verify.validToken,
  validatingToken: auth.verify.validatingToken,
  user: auth.authState.user
})

const mapDispatchToProps = {
  verifyUser
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify))
