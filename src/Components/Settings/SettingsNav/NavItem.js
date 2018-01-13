import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Icons
import RightArrow from 'Assets/Icons/settings/right_arrow.svg'

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
    const { name, icon: Icon, selected } = this.props
    const navItemStyle = classNames('nav-item', {
      selected
    })

    const iconStyle = classNames('icon', {
      selected
    })

    return (
      <div styleName={navItemStyle} onClick={this.handleClick}>
        <Icon styleName={iconStyle} />
        {name}
        {
          selected &&
          <RightArrow style={{ position: 'absolute', right: '5px' }} />
        }
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
