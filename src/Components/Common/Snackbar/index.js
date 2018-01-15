import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './Snackbar.scss'

// Actions
import { closeSnackbar } from 'Actions'

class Snackbar extends React.Component {
  state = {
    show: false
  }

  componentWillReceiveProps (newProps) {
    if (newProps.message) {
      this.setState({
        show: true
      }, () => {
        setTimeout(this.autoCloseSnackbar, newProps.duration)
      })
    }
  }

  autoCloseSnackbar = () => {
    if (this.state.show) {
      this.setState({ show: false }, () => this.props.closeSnackbar())
    }
  }

  closeSnackbar = () => {
    // Add logic to close snackbar on clicks
    console.log(this.props.duration)
  }

  render () {
    const { message, children } = this.props

    const snackBarContainer = classNames('snackbar', {
      show: this.state.show
    })

    const snackBarText = classNames('snackbar-text', {
      show: this.state.show
    })

    return (
      [
        children,
        <div styleName={snackBarContainer} key="snackbar">
          <div styleName="snackbar-content">
            <div styleName={snackBarText}>
              <span>{message}</span>
            </div>
          </div>
        </div>
      ]
    )
  }
}

Snackbar.defaultProps = {
  message: '',
  duration: 2000
}

Snackbar.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  closeSnackbar: PropTypes.func.isRequired
}

const mapStateToProps = ({ snackbar }) => ({
  message: snackbar.message,
  duration: snackbar.duration
})

const mapDispatchToProps = {
  closeSnackbar
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar)
