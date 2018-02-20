import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'

// Components
import ChangePassword from './ChangePassword'

// CSS
import './AccountSettings.scss'

class AccountDetails extends React.Component {
  state = {
    changePassword: false
  }

  togglePasswordChange = () => {
    this.setState({ changePassword: !this.state.changePassword })
  }

  render () {
    const { email } = this.props

    return (
      <div>
        <Row middle='xs' styleName="row">
          <div styleName="col">
            <p className="label">Email:</p>
          </div>

          <div>
            <p>{email}</p>
          </div>
        </Row>

        <Row middle='xs' styleName="end-row">
          <div styleName="col">
            <p className="label">Password:</p>
          </div>

          <div>
            <p
              onClick={this.togglePasswordChange}
              className="link"
            >
              Change password
            </p>
          </div>
        </Row>

        <ChangePassword
          toggle={this.togglePasswordChange}
          isOpen={this.state.changePassword}
        />
      </div>
    )
  }
}

AccountDetails.propTypes = {
  email: PropTypes.string.isRequired,
}

const mapStateToProps = ({ auth }) => ({
  email: auth.authState.user.email
})

export default connect(
  mapStateToProps
)(AccountDetails)
