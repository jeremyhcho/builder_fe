import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// Components
import Matches from 'Assets/Icons/nav/basketball-13.svg'
import MatchesSelected from 'Assets/Icons/nav/basketball-selected.svg'

// CSS
import './SideNav.scss'

const navItems = [
  {
    icon: Matches,
    selectedIcon: MatchesSelected,
    route: '/matches',
    key: 'matches'
  }
]

class SideNav extends React.Component {
  state = {
    selectedItem: ''
  }

  handleClick = (key, route) => {
    return () => {
      this.setState({
        selectedItem: key
      }, () => {
        this.props.history.push(route)
      })
    }
  }

  render () {
    return (
      <div styleName="sidenav">
        {navItems.map(({ icon: Icon, selectedIcon: SelectedIcon, route, key }) => {
          const selected = key === this.state.selectedItem
          const navItemStyle = classNames('nav-item', {
            selected
          })

          return (
            <div
              key={key}
              styleName={navItemStyle}
              onClick={this.handleClick(key, route)}
              selected={selected}
            >
              {selected ?
                <SelectedIcon height={20} width={20} />
                : <Icon height={20} width={20} />
              }
            </div>
          )
        })}
      </div>
    )
  }
}

SideNav.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SideNav)
