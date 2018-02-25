import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components
import { QuartzLink } from 'Components/Common'

// CSS
import './SettingsNav.scss'

const NavItem = ({ name, route, selected, icon: Icon, selectedIcon: SelectedIcon }) => {
  const navItemStyle = classNames('nav-item', {
    selected
  })

  const iconStyle = classNames('icon', {
    selected
  })

  return (
    <QuartzLink to={{ pathname: `/settings/${route}` }}>
      <div styleName={navItemStyle}>
        {
          selected ? <SelectedIcon styleName={iconStyle} width={14} height={14} />
            : <Icon styleName={iconStyle} width={14} height={14} />
        }

        <p>{name}</p>
      </div>
    </QuartzLink>
  )
}

NavItem.defaultProps = {
  selected: false
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  selectedIcon: PropTypes.func.isRequired,
  selected: PropTypes.array,
  route: PropTypes.string.isRequired
}

export default NavItem
