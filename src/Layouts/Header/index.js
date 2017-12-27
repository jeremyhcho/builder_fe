import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'

// Components
import { MenuItem, IconDropdown, Tooltip } from 'Components/Common'

// CSS
import './Header.scss'

// Assets
import ProfileIcon from 'Assets/Icons/header/profile.svg'
import NotificationIcon from 'Assets/Icons/header/notification.svg'

// Actions
import { logoutUser } from 'Actions'

const SECTION_NAMES = {
  '/': 'Dashboard',
  '/games': 'Games',
  '/games/:id/:sectionName': 'Game Details',
  '/teams': 'Teams',
  '/teams/:id/:sectionName': 'Team Details',
  '/settings': 'Settings'
}

class Header extends React.Component {
  getCurrentRoute() {
    for (const regexp of Object.keys(SECTION_NAMES)) {
      if (pathToRegexp(regexp).exec(this.props.location.pathname)) {
        return SECTION_NAMES[regexp]
      }
    }

    return null
  }

  navigateSettings = () => {
    this.props.history.push('/settings')
  }

  render () {
    return (
      <div styleName='header'>
        <div styleName='header-content'>
          <div styleName='title'>
            <h1 className="semibold">{this.getCurrentRoute()}</h1>
          </div>

          <ul styleName='header-items'>
            <li data-tip-for='notification-icon'>
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
              <Tooltip id='notification-icon' pos='bottom'>Notifications</Tooltip>
            </li>

            <li>
              <IconDropdown
                horizontalReverse
                listStyle={{ textAlign: 'center', minWidth: '100px' }}
                icon={<ProfileIcon style={{ marginTop: '5px' }} />}
              >
                <MenuItem onClick={this.navigateSettings}>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => this.props.logoutUser()}>
                  Sign out
                </MenuItem>
              </IconDropdown>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logoutUser
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Header))
