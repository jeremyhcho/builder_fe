import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'

// Components
import NavItem from './NavItem'

// Icons
import AccountEditIcon from 'Assets/Icons/settings/account_edit.svg'
import SpaceshipIcon from 'Assets/Icons/settings/spaceship.svg'

// CSS
import './SettingsNav.scss'

class SettingsNav extends React.Component {
  select = (route) => {
    this.props.history.push(`/settings/${route}`)
  }

  renderNavItems () {
    const navItems = [
      {
        name: 'Account',
        icon: AccountEditIcon,
        select: this.select,
        route: 'account'
      },
      {
        name: 'Subscription',
        icon: SpaceshipIcon,
        select: this.select,
        route: 'subscription'
      }
    ]

    return navItems.map(item => (
      <NavItem
        key={item.name}
        name={item.name}
        icon={item.icon}
        route={item.route}
        select={item.select}
        selected={this.props.location.pathname.slice(10) === item.route}
      />
    ))
  }

  render () {
    return (
      <div styleName="settings-nav">
        {this.renderNavItems()}
      </div>
    )
  }
}

SettingsNav.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default SettingsNav
