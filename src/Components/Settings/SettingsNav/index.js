import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'

// Components
import NavItem from './NavItem'

// Icons
import AccountEditIcon from 'Assets/Icons/settings/account-edit.svg'
import ListIcon from 'Assets/Icons/settings/list.svg'

// CSS
import './SettingsNav.scss'

class SettingsNav extends React.Component {
  select = (route) => {
    this.props.history.push({ pathname: `/settings/${route}` })
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
        icon: ListIcon,
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
        selected={this.props.location.pathname.slice(10).match(item.route)}
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
