import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import NotificationDropdown from './NotificationDropdown'
import { Tooltip } from 'Components/Common'

// Assets
import NotificationIcon from 'Assets/Icons/notification.svg'

// CSS
import './NotificationDropdown.scss'

// Actions
import { readNotifications, updateReadNotifications } from 'Actions'

class Notifications extends React.Component {
  state = {
    open: false
  }

  componentDidMount () {
    document.querySelector('body').addEventListener('click', this.onBlur)
  }

  componentWillUnmount () {
    document.querySelector('body').removeEventListener('click', this.onBlur)
  }

  onBlur = (e) => {
    if (this.dropdownWrapper.contains(e.target) || !this.state.open) {
      return
    }

    this.props.updateReadNotifications()
    this.setState({ open: false })
  }

  toggleDropdown = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.props.unreadCount > 0 && this.state.open) {
        this.props.readNotifications()
      }

      if (!this.state.open) {
        this.props.updateReadNotifications()
      }
    })
  }

  render () {
    return (
      <li
        style={{ position: 'relative' }}
        ref={dropdownWrapper => this.dropdownWrapper = dropdownWrapper}
      >
        <div
          styleName='icon-wrapper'
          data-tip-for='notification-icon'
          style={{ height: '36px' }}
          onClick={this.toggleDropdown}
        >
          <NotificationIcon
            width={18}
            height={18}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          {
            this.props.unreadCount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--red)',
                  borderRadius: '50%',
                  bottom: '6px',
                  right: '6px'
                }}
              />
            )
          }
        </div>
        <NotificationDropdown open={this.state.open} />
        <Tooltip id='notification-icon' pos='left'>Notifications</Tooltip>
      </li>
    )
  }
}

Notifications.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  readNotifications: PropTypes.func.isRequired,
  updateReadNotifications: PropTypes.func.isRequired
}

const mapStateToProps = ({ notifications }) => ({
  unreadCount: notifications.unreadCount
})

const mapDispatchToProps = {
  readNotifications,
  updateReadNotifications
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
