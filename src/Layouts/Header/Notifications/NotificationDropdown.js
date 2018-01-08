import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'

// CSS
import './NotificationDropdown.scss'

// Assets
// import InfoIcon from 'Assets/Icons/header/info.svg'
// import WarningIcon from 'Assets/Icons/header/warning.svg'
// import ErrorIcon from 'Assets/Icons/header/error.svg'

const PRIORITIES_TO_COLOR = {
  INFO: 'blue',
  DANGER: 'red',
  WARNING: 'gold',
  SUCCESS: 'green'
}

const PRIORITIES_TO_TEXT = {
  INFO: 'NOTICE',
  DANGER: 'URGENT',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS'
}

class NotificationDropdown extends React.Component {
  render () {
    const { open, notifications, unreadCount } = this.props

    const dropdownClass = classNames('notification-dropdown', {
      open
    })

    return (
      <div styleName={dropdownClass}>
        <div styleName='header'>
          <span
            className='semibold'
            style={{
              position: 'absolute',
              left: '20px',
              top: '10px'
            }}
          >
            Notifications
          </span>
          <span className='semibold small label' styleName='unread-count'>
            { unreadCount > 0 && `${unreadCount} new` }
          </span>
        </div>

        <ul styleName='notifications'>
          {
            notifications.map(notification => {
              const backgroundColor = `var(--${PRIORITIES_TO_COLOR[notification.priority]})`
              const unreadClass = classNames('unread-indicator', {
                unread: !notification.is_read
              })

              return (
                <li styleName='notification-item' key={notification.id}>
                  <div styleName='notification-item-main'>
                    <p
                      styleName='pill'
                      className='semibold'
                      style={{ backgroundColor }}
                    >
                      {PRIORITIES_TO_TEXT[notification.priority]}
                    </p>

                    <p className='semibold' styleName='title'>
                      <span styleName={unreadClass} />
                      {notification.title}
                    </p>
                    <p className='small' styleName='message'>
                      {notification.message}
                    </p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

NotificationDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  unreadCount: PropTypes.number.isRequired
}

const mapStateToProps = ({ notifications }) => ({
  unreadCount: notifications.unreadCount,
  notifications: notifications.notifications
})

export default connect(
  mapStateToProps
)(NotificationDropdown)
