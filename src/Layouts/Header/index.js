import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { IconMenuItem, IconDropdown, QuartzLink } from 'Components/Common'
import Notifications from './Notifications'

// Icons
import LeftArrowIcon from 'Assets/Icons/left-arrow.svg'

// CSS
import './Header.scss'

// Assets
import ProfileIcon from 'Assets/Icons/profile.svg'
import AccountSettingsIcon from 'Assets/Icons/settings/fc-cog.svg'
import SignoutIcon from 'Assets/Icons/settings/input-12.svg'

// Actions
import { logoutUser, fetchNotifications } from 'Actions'

class Header extends React.Component {
  componentDidMount () {
    this.props.fetchNotifications()
  }

  navigateSettings = () => {
    this.props.history.push({ pathname: '/settings' })
  }

  navigateBack = () => {
    const { history, backUrl } = this.props
    history.push({ pathname: backUrl })
  }

  render () {
    return (
      <div styleName='header'>
        <div styleName='header-content'>
          <div styleName='title'>
            {
              this.props.backUrl && (
                <QuartzLink to={{ pathname: this.props.backUrl }}>
                  <LeftArrowIcon styleName="back-icon" />
                </QuartzLink>
              )
            }
            <h1 className="semibold">{this.props.header}</h1>
          </div>

          <ul styleName='header-items'>
            <Notifications />

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
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  backUrl: PropTypes.string.isRequired
}

const mapStateToProps = ({ globalInfo }) => ({
  header: globalInfo.header,
  backUrl: globalInfo.backUrl
})

const mapDispatchToProps = {
  logoutUser,
  fetchNotifications
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
