import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'

// Components
import { IconMenuItem, IconDropdown, Tooltip } from 'Components/Common'

// CSS
import './Header.scss'

// Assets
import ProfileIcon from 'Assets/Icons/header/profile.svg'
import NotificationIcon from 'Assets/Icons/header/notification.svg'
import AccountSettingsIcon from 'Assets/Icons/settings/a-edit-2.svg'
import SignoutIcon from 'Assets/Icons/settings/input-12.svg'

// Actions
import { logoutUser } from 'Actions'

const SECTION_NAMES = {
  '/': 'Dashboard',
  '/games': 'Games',
  '/games/:id/:sectionName': 'Game Details',
  '/teams': 'Teams',
  '/teams/:id/:sectionName': 'Team Details',
  '/settings': 'Settings',
  '/models': 'Models'
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
                listStyle={{ minWidth: '200px' }}
                icon={<ProfileIcon style={{ marginTop: '5px' }} />}
              >
                <IconMenuItem
                  icon={<AccountSettingsIcon width={14} height={14} />}
                  onClick={this.navigateSettings}
                >
                  <span>Settings</span>
                </IconMenuItem>

                <IconMenuItem
                  onClick={() => this.props.logoutUser()}
                  icon={<SignoutIcon width={14} height={14} />}
                >
                  Log out
                </IconMenuItem>
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
