import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { QuzeLink } from 'Components/Common'

// CSS
import './SettingsNav.scss'

const NavItem = ({ name, route, selected, icon: Icon }) => {
  const navItemStyle = classNames('nav-item', {
    selected
  })

  const iconStyle = classNames('icon', {
    selected
  })

  return (
    <QuzeLink to={{ pathname: `/settings/${route}` }}>
      <div styleName={navItemStyle}>
        <Icon styleName={iconStyle} width={14} height={14} />

        <p>{name}</p>
      </div>
    </QuzeLink>
  )
}

NavItem.defaultProps = {
  selected: false
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  // selectedIcon: PropTypes.func.isRequired,
  selected: PropTypes.array,
  route: PropTypes.string.isRequired
}

export default NavItem
