import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Icons
import QuartzIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './Header.scss'

class Header extends React.Component {
  componentWillReceiveProps (newProps) {
    if (!newProps.authorized && this.props.authorized) {
      this.props.history.push({ pathname: '/auth/login', state: { from: '/' } })
    }
  }

  routeToQuartz = () => {
    this.props.history.push({ pathname: '/dashboard', state: { from: '/' } })
  }

  routeToSignup = () => {
    this.props.history.push({ pathname: '/auth/signup', state: { from: '/' } })
  }

  routeToLogin = () => {
    this.props.history.push({ pathname: '/auth/login', state: { from: '/' } })
  }

  renderCTA () {
    const { authorized } = this.props

    if (authorized) {
      return [
        <button
          onClick={this.routeToQuartz}
          key="button-1"
          styleName="action blue"
        >
          Go to Quartz
        </button>
      ]
    }

    return (
      [
        <button
          key="button-1"
          styleName="action blue"
          onClick={this.routeToSignup}
        >
          Start free trial
        </button>,
        <button
          onClick={this.routeToLogin}
          styleName="action flat"
          key="button-2"
        >
          Log in
        </button>
      ]
    )
  }

  render () {
    return (
      <header styleName="header">
        <main styleName="col-1000">
          <section styleName="left">
            <div styleName="intro">
              <QuartzIcon
                width={58}
                height={58}
                style={{ marginRight: '20px' }}
              />

              <h1 styleName="title">Quartz</h1>

              <p styleName="description">
                A grape! Because who can get a watermelon in their mouth.
              </p>
            </div>

            <div styleName="cta">
              {this.renderCTA()}
            </div>
          </section>

          <section styleName="right">
            <div>
              <img
                src="https://s3-us-west-1.amazonaws.com/builder-api/data_exports/assets/macbook_pro.jpg"
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </section>
        </main>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized
})

export default withRouter(connect(
  mapStateToProps
)(Header))
