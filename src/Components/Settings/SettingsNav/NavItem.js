import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './SettingsNav.scss'

class NavItem extends React.Component {
  handleClick = () => {
    const { selected, route, select } = this.props

    if (!selected) {
      select(route)
    }
  }

  render () {
    const { name, selected, icon: Icon } = this.props
    const navItemStyle = classNames('nav-item', {
      selected
    })

    const iconStyle = classNames('icon', {
      selected
    })

    return (
      <div styleName={navItemStyle} onClick={this.handleClick}>
        <Icon styleName={iconStyle} width={14} height={14} />
        <p>{name}</p>
      </div>
    )
  }
}

NavItem.defaultProps = {
  selected: false
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  selected: PropTypes.array,
  select: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired
}

export default NavItem
